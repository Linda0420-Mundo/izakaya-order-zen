
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText } from 'lucide-react';
import PriceFormatter from '@/components/ui/price-formatter';

// In a real app, this would come from an API
const orders = [
  {
    id: '123',
    date: '2024-04-27',
    total: 3250,
    status: 'preparing',
    items: ['Spicy Tuna Roll', 'Miso Soup', 'Green Tea'],
  },
  {
    id: '124',
    date: '2024-04-26',
    total: 4500,
    status: 'completed',
    items: ['Tempura Udon', 'Gyoza', 'Sake'],
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'preparing':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'completed':
      return 'bg-green-500 hover:bg-green-600';
    case 'cancelled':
      return 'bg-red-500 hover:bg-red-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

const Orders = () => {
  const navigate = useNavigate();

  if (orders.length === 0) {
    return (
      <Layout>
        <div className="container px-4 py-16 flex flex-col items-center justify-center">
          <FileText className="h-16 w-16 text-izakaya-sand mb-4" />
          <h2 className="text-2xl font-medium mb-2">No orders found</h2>
          <p className="text-izakaya-darkgray mb-6">
            You haven't placed any orders yet
          </p>
          <Button
            onClick={() => navigate('/menu')}
            className="bg-izakaya-vermilion hover:bg-izakaya-vermilion/90 text-white"
          >
            Browse Menu
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-medium">Your Orders</h1>
          <p className="text-izakaya-darkgray mt-2">注文履歴</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-izakaya-sand">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.items.join(', ')}</TableCell>
                  <TableCell>
                    <PriceFormatter price={order.total} />
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
