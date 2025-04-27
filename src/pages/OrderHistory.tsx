import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Package, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { format } from 'date-fns';

// 模擬訂單數據
const orders = [
  {
    id: 'ORD-2024-001',
    date: new Date('2024-04-25'),
    status: 'completed',
    total: 5800,
    items: [
      { name: '鮭魚壽司', quantity: 2, price: 1200 },
      { name: '天婦羅', quantity: 1, price: 1800 },
      { name: '清酒', quantity: 1, price: 1600 },
    ],
  },
  {
    id: 'ORD-2024-002',
    date: new Date('2024-04-20'),
    status: 'cancelled',
    total: 3200,
    items: [
      { name: '照燒雞肉丼', quantity: 1, price: 1200 },
      { name: '味噌湯', quantity: 2, price: 1000 },
    ],
  },
];

const OrderHistory = () => {
  const navigate = useNavigate();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '已完成';
      case 'cancelled':
        return '已取消';
      default:
        return '處理中';
    }
  };

  return (
    <Layout>
      <div className="container px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-serif font-medium">Order History</h1>
          <p className="text-izakaya-darkgray mt-2">注文履歴</p>
        </div>
        
        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-izakaya-paper rounded-lg p-6 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-medium">訂單 #{order.id}</h3>
                    <p className="text-izakaya-darkgray">
                      {format(order.date, 'yyyy年MM月dd日 HH:mm')}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(order.status)}
                    <span className="text-sm">{getStatusText(order.status)}</span>
                  </div>
                </div>
                
                <div className="border-t border-izakaya-lightgray pt-4">
                  <div className="space-y-2 mb-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <span>{item.name} x {item.quantity}</span>
                        <span>¥{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between font-medium border-t border-izakaya-lightgray pt-2">
                    <span>總金額</span>
                    <span>¥{order.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="bg-izakaya-paper p-6 rounded-full mb-6">
              <Package className="h-16 w-16 text-izakaya-darkgray" />
            </div>
            <h2 className="text-2xl font-medium mb-2">尚無訂單記錄</h2>
            <p className="text-izakaya-darkgray mb-6 max-w-md">
              您的訂單歷史將在您完成第一筆訂單後顯示在這裡
            </p>
            <Button 
              onClick={() => navigate('/menu')}
              className="bg-izakaya-vermilion hover:bg-izakaya-vermilion/90 text-white"
            >
              立即點餐
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderHistory;
