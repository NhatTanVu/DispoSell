import React, {useEffect, useRef, useState} from "react";
import GoogleMapReact from 'google-map-react';
import {Button, Card} from "react-bootstrap";
import localStyles from "../../scss/pages/cart.module.scss";

export default function DeliveryDetail({
                                           isEditable,
                                           startCoordinate,
                                           endCoordinate,
                                           deliveryInfo
                                       }) {
    const startMarkerRef = useRef(null);
    const endMarkerRef = useRef(null);
    const directionsServiceRef = useRef(null);
    const directionsDisplayRef = useRef(null);
    const currentMapRef = useRef(null);
    const initIntervalRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const [eta, setEta] = useState("N/A");
    const defaultProps = {
        center: {
            lat: 49.203691381047534,
            lng: -122.91278600692749
        },
        zoom: 16,
        Warehouse: {
            lat: 49.203691381047534,
            lng: -122.91278600692749
        }
    };
    const removeMarker = (marker) => {
        if (marker) {
            marker.setMap(null);
            marker = null;
        }
    }
    const addMarker = (map, position, label) => {
        if (map !== null) {
            map.setCenter({"lat": position.lat, "lng": position.lng});
            if (position.zoom) {
                map.setZoom(position.zoom);
            }
            return new google.maps.Marker({
                map,
                label: {
                    text: label,
                    color: 'white'
                },
                position: {"lat": position.lat, "lng": position.lng}
            });
        }
        return null;
    }
    const drawRoute = (map, startMarker, endMarker) => {
        const request = {
            origin: new google.maps.LatLng(startMarker.position.lat(), startMarker.position.lng()),
            destination: new google.maps.LatLng(endMarker.position.lat(), endMarker.position.lng()),
            travelMode: google.maps.TravelMode.DRIVING
        };
        directionsDisplayRef.current.setMap(null);
        directionsServiceRef.current.route(request, function (response, status) {
            if (response.status == google.maps.DirectionsStatus.OK) {
                setEta(response.routes[0]?.legs[0]?.duration.text);
                directionsDisplayRef.current.setDirections(response);
                directionsDisplayRef.current.setMap(map);
            } else {
                alert("Directions Request from " + startMarker.position.toUrlValue(6) + " to " + endMarker.position.toUrlValue(6) + " failed: " + status);
            }
        });
    };
    const changeRoute = (lat, lng) => {
        removeMarker(startMarkerRef.current);
        startMarkerRef.current = addMarker(currentMapRef.current, {"lat": lat, "lng": lng}, 'A');
        drawRoute(currentMapRef.current, startMarkerRef.current, endMarkerRef.current);
    };
    const handleApiLoaded = (map, maps) => {
        if (isEditable) {
            map.addListener('click', (e) => {
                changeRoute(e.latLng.lat(), e.latLng.lng());
            });
        }
        directionsServiceRef.current = new google.maps.DirectionsService();
        directionsDisplayRef.current = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });

        try {
            startMarkerRef.current = addMarker(map, JSON.parse(startCoordinate), 'A');
        } catch (ex) {
            if (defaultProps[startCoordinate]) {
                startMarkerRef.current = addMarker(map, defaultProps[startCoordinate], 'A');
            } else {
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': startCoordinate}, function (results, status) {
                    if (status == 'OK') {
                        startMarkerRef.current = addMarker(map, results[0].geometry.location, 'A');
                    } else {
                        console.log('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
        }

        try {
            endMarkerRef.current = addMarker(map, JSON.parse(endCoordinate), 'B');
        } catch (ex) {
            if (defaultProps[endCoordinate]) {
                endMarkerRef.current = addMarker(map, defaultProps[endCoordinate], 'B');
            } else {
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': endCoordinate}, function (results, status) {
                    if (status == 'OK') {
                        endMarkerRef.current = addMarker(map, {
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng()
                        }, 'B');
                    } else {
                        console.log('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
        }

        currentMapRef.current = map;
        initIntervalRef.current = window.setInterval(() => {
            if (startMarkerRef.current != null && endMarkerRef.current != null) {
                drawRoute(map, startMarkerRef.current, endMarkerRef.current);
                connect();
                clearInterval(initIntervalRef.current);
            }
        }, 200);
    };
    const zoomCurrent = (e) => {
        currentMapRef.current.setCenter(new google.maps.LatLng(startMarkerRef.current.position.lat(), startMarkerRef.current.position.lng()));
        currentMapRef.current.setZoom(16);
        e.preventDefault();
    };

    const stompClient = useRef(null);
    const stompSessionID = useRef(null);
    const connect = () => {
        const socket = new SockJS('/disposell-websocket');
        stompClient.current = Stomp.over(socket);
        stompClient.current.connect({}, function (frame) {
            stompSessionID.current = /\/([^\/]+)\/websocket/.exec(socket._transport.url)[1];
            console.log("sessionId = " + stompSessionID.current);
            stompClient.current.subscribe('/onTrackingUpdated', (response) => {
                let trackingInfo = JSON.parse(response.body);
                if (trackingInfo != null && stompSessionID.current != trackingInfo.sessionID) {
                    console.log(trackingInfo);
                    changeRoute(trackingInfo.lat, trackingInfo.lng);
                }
            });
            stompClient.current.subscribe('/onTrackingCompleted', (response) => {
                setIsVisible(false);
            });
        });
    };
    const disconnect = () => {
        if (stompClient.current !== null) {
            stompClient.current.disconnect();
        }
    };
    const onTrackingUpdateClick = (lat, lng) => {
        let trackingInfo = {
            sessionID: stompSessionID.current,
            deliveryID: deliveryInfo.deliveryID,
            lat: lat,
            lng: lng
        };
        if (stompClient.current !== null) {
            console.log(trackingInfo);
            stompClient.current.send("/updateTracking", {}, JSON.stringify(trackingInfo));
        }
    };
    const onTrackingCompleteClick = (e) => {
        let trackingInfo = {
            sessionID: stompSessionID.current,
            deliveryID: deliveryInfo.deliveryID
        };
        if (stompClient.current !== null) {
            console.log(trackingInfo);
            stompClient.current.send("/completeTracking", {}, JSON.stringify(trackingInfo));
        }
    };
    useEffect(() => {
        return function cleanup() {
            clearInterval(initIntervalRef.current);
            disconnect();
        };
    }, []);

    return (
        <>
            {isVisible && <Card style={{
                marginTop: "20px",
                backgroundColor: "#F8F8FA",
                borderRadius: "15px"
            }}>
                <Card.Header className={localStyles["card-header-class"]} as="h3"
                             style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                    <span>Track Delivery</span>
                    {isEditable && <Button className={`${localStyles['btn']}`} onClick={(e) => zoomCurrent(e)}
                                           style={{marginTop: 0, flex: "0", whiteSpace: "nowrap"}}>Zoom
                        In</Button>}
                </Card.Header>
                <Card.Body style={{padding: "1rem 0 0 0"}}>
                    <Card.Text>
                        <table className="table">
                            <tbody>
                            {deliveryInfo.vehicleNumber != "" && <tr>
                                <td><b>Vehicle Number</b></td>
                                <td>{deliveryInfo.vehicleNumber}</td>
                            </tr>}
                            {deliveryInfo.vehicleType != "" && <tr>
                                <td><b>Vehicle Type</b></td>
                                <td>{deliveryInfo.vehicleType}</td>
                            </tr>}
                            <tr>
                                <td><b>ETA</b></td>
                                <td>{eta}</td>
                            </tr>
                            </tbody>
                        </table>
                        <div style={{height: "500px"}}>
                            <GoogleMapReact
                                bootstrapURLKeys={{
                                    key: "AIzaSyCAAG_UPPB4khoxt6KzPWidWSXABZAwEqU",
                                    libraries: ['places']
                                }}
                                defaultCenter={defaultProps.center}
                                defaultZoom={defaultProps.zoom}
                                yesIWantToUseGoogleMapApiInternals
                                onGoogleApiLoaded={({map, maps}) => handleApiLoaded(map, maps)}
                            />
                        </div>
                        {isEditable && <div style={{display: "flex", gap: "1rem"}}>
                            <Button className={`${localStyles['btn']}`}
                                    onClick={(e) => onTrackingUpdateClick(startMarkerRef.current.position.lat(), startMarkerRef.current.position.lng())}>Update
                                Tracking</Button>
                            <Button className={`${localStyles['btn']}`} onClick={(e) => onTrackingCompleteClick(e)}>Complete
                                Tracking</Button>
                        </div>}
                    </Card.Text>
                </Card.Body>
            </Card>}
        </>
    );
}