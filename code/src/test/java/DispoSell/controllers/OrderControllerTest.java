package DispoSell.controllers;

import DispoSell.models.*;
import DispoSell.repositories.*;
import DispoSell.services.*;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class OrderControllerTest {
    @InjectMocks
    private OrderController orderControllerImpl;

    @Mock
    private OrderService orderService;

    @Mock
    private PurchaseOrderRepository purchaseOrderRepository;

    @Mock
    private TradeOrderRepository tradeOrderRepository;

    @Before("")
    public void init() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void getAllPurchaseOrders() {
        // Arrange
        PurchaseOrder purchaseOrder1 = new PurchaseOrder();
        purchaseOrder1.setOrderID(1L);
        List<PurchaseOrder> purchaseOrders = new ArrayList<>(
                Arrays.asList(purchaseOrder1)
        );
        when(purchaseOrderRepository.findAll()).thenReturn(purchaseOrders);
        // Act
        List<PurchaseOrder> orders = orderControllerImpl.getAllPurchaseOrders();
        // Assert
        assertEquals(purchaseOrders, orders);
    }

    @Test
    void getAllTradeOrders() {
        // Arrange
        TradeOrder tradeOrder1 = new TradeOrder();
        tradeOrder1.setOrderID(1L);
        List<TradeOrder> tradeOrders = new ArrayList<>(
                Arrays.asList(tradeOrder1)
        );
        when(tradeOrderRepository.findAll()).thenReturn(tradeOrders);
        // Act
        List<TradeOrder> orders = orderControllerImpl.getAllTradeOrders();
        // Assert
        assertEquals(tradeOrders, orders);
    }

    @Test
    void createTradeOrder() {
    }

    @Test
    void createPurchaseOrder() {
    }

    @Test
    void getPurchaseOrderByID() {
        PurchaseOrder purchaseOrder = new PurchaseOrder();
        purchaseOrder.setOrderID(1L);
        Order id = purchaseOrder;

        when(purchaseOrderRepository.findByOrderID(purchaseOrder.getOrderID())).thenReturn(purchaseOrder);

        Order orderID = orderControllerImpl.getPurchaseOrderByID(1L);

        assertEquals(id, orderID);
    }

    @Test
    void getTradeOrderByID() {
    }
}