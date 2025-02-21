import express from "express";
import { 
    createOrder, 
    getAverageOrderValue, 
    getCustomersWithoutOrders, 
    getTopCustomerByItems, 
    getTopSpendingCustomers, 
    getFrequentCustomers, 
    getPercentageMultipleOrders, 
    getFirstCustomerOrder 
} from "./order.controller.js";

const router = express.Router();

router.post("/create", createOrder);
router.get("/average-order-value", getAverageOrderValue);
router.get("/customers-without-orders", getCustomersWithoutOrders);
router.get("/top-customer-items", getTopCustomerByItems);
router.get("/top-spending-customers", getTopSpendingCustomers);
router.get("/frequent-customers", getFrequentCustomers);
router.get("/percentage-multiple-orders", getPercentageMultipleOrders);
router.get("/first-customer-order", getFirstCustomerOrder);

export default router;

