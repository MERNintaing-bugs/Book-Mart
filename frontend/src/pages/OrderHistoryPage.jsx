import React from 'react';
import { Link } from 'react-router-dom';
import { Package, Calendar, DollarSign, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import './OrderHistoryPage.css';

const OrderHistoryPage = () => {
  const { orders } = useCart();
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="orders-page">
        <div className="container">
          <div className="auth-required">
            <h2>Please sign in to view your orders</h2>
            <Link to="/login" className="btn btn-primary">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'processing':
        return 'info';
      case 'shipped':
        return 'primary';
      case 'delivered':
        return 'success';
      case 'cancelled':
        return 'danger';
      default:
        return 'secondary';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'processing':
        return 'Processing';
      case 'shipped':
        return 'Shipped';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  return (
    <div className="orders-page">
      <div className="container">
        <div className="page-header">
          <Link to="/profile" className="back-link">
            <ArrowLeft size={16} />
            Back to Profile
          </Link>
          <h1>Order History</h1>
          <p>Track your orders and view purchase history</p>
        </div>

        {orders.length === 0 ? (
          <div className="no-orders">
            <Package size={80} />
            <h2>No orders found</h2>
            <p>You haven't placed any orders yet. Start shopping to see your orders here.</p>
            <Link to="/books" className="btn btn-primary btn-large">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <div className="order-info">
                    <h3>Order #{order.id}</h3>
                    <div className="order-meta">
                      <span className="order-date">
                        <Calendar size={14} />
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                      <span className="order-total">
                        <DollarSign size={14} />
                        ${order.total.toFixed(2)}
                      </span>
                    </div>
                  </div>
                  <div className={`order-status ${getStatusColor(order.status)}`}>
                    {getStatusText(order.status)}
                  </div>
                </div>

                <div className="order-items">
                  {order.items.map((item) => (
                    <div key={item.id} className="order-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.title} />
                      </div>
                      <div className="item-details">
                        <h4>{item.title}</h4>
                        <p>by {item.author}</p>
                        <div className="item-meta">
                          <span className="item-quantity">Qty: {item.quantity}</span>
                          <span className="item-price">${item.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-actions">
                  <button className="btn btn-secondary btn-small">
                    Track Order
                  </button>
                  <button className="btn btn-outline btn-small">
                    View Details
                  </button>
                  {order.status === 'delivered' && (
                    <button className="btn btn-primary btn-small">
                      Write Review
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage;