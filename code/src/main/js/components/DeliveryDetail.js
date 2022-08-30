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
    let startMarker = null;
    let endMarker = null;
    let directionsService = null;
    let directionsDisplay = null;
    let currentMap = null;
    let initInterval = null;
    const [isVisible, setIsVisible] = useState(true);
    const defaultProps = {
        center: {
            lat: 49.203691381047534,
            lng: -122.91278600692749
        },
        zoom: 16,
        mapTypeId: "roadmap",
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
        directionsDisplay.setMap(null);
        directionsService.route(request, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                directionsDisplay.setMap(map);
            } else {
                alert("Directions Request from " + startPosition.toUrlValue(6) + " to " + endPosition.toUrlValue(6) + " failed: " + status);
            }
        });
    };
    const changeRoute = (lat, lng) => {
        removeMarker(startMarker);
        startMarker = addMarker(currentMap, {"lat": lat, "lng": lng}, 'A');
        drawRoute(currentMap, startMarker, endMarker);
    };
    const handleApiLoaded = (map, maps) => {
        // use map and maps objects
        if (isEditable) {
            map.addListener('click', (e) => {
                changeRoute(e.latLng.lat(), e.latLng.lng());
            });
        }
        directionsService = new google.maps.DirectionsService();
        directionsDisplay = new google.maps.DirectionsRenderer({
            suppressMarkers: true
        });

        try {
            startMarker = addMarker(map, JSON.parse(startCoordinate), 'A');
        } catch (ex) {
            if (defaultProps[startCoordinate]) {
                startMarker = addMarker(map, defaultProps[startCoordinate], 'A');
            } else {
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': startCoordinate}, function (results, status) {
                    if (status == 'OK') {
                        startMarker = addMarker(map, results[0].geometry.location, 'A');
                    } else {
                        console.log('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
        }

        try {
            endMarker = addMarker(map, JSON.parse(endCoordinate), 'B');
        } catch (ex) {
            if (defaultProps[endCoordinate]) {
                endMarker = addMarker(map, defaultProps[endCoordinate], 'B');
            } else {
                const geocoder = new google.maps.Geocoder();
                geocoder.geocode({'address': endCoordinate}, function (results, status) {
                    if (status == 'OK') {
                        endMarker = addMarker(map, {
                            lat: results[0].geometry.location.lat(),
                            lng: results[0].geometry.location.lng()
                        }, 'B');
                    } else {
                        console.log('Geocode was not successful for the following reason: ' + status);
                    }
                });
            }
        }

        currentMap = map;
        initInterval = window.setInterval(() => {
            if (startMarker != null && endMarker != null) {
                drawRoute(map, startMarker, endMarker);
                connect();
                clearInterval(initInterval);
            }
        }, 200);
    };
    const zoomCurrent = (e) => {
        currentMap.setCenter(new google.maps.LatLng(startMarker.position.lat(), startMarker.position.lng()));
        currentMap.setZoom(16);
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
            clearInterval(initInterval);
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
                    <span>Track Order</span>
                    {isEditable && <Button className={`${localStyles['btn']}`} onClick={(e) => zoomCurrent(e)}
                                           style={{marginTop: 0, flex: "0", whiteSpace: "nowrap"}}>Zoom
                        In</Button>}
                </Card.Header>
                <Card.Body style={{padding: "1rem 0 0 0"}}>
                    <Card.Text>
                        {(deliveryInfo.vehicleNumber != "" || deliveryInfo.vehicleType != "") &&
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
                                </tbody>
                            </table>}
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
                                    onClick={(e) => onTrackingUpdateClick(startMarker.position.lat(), startMarker.position.lng())}>Update
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