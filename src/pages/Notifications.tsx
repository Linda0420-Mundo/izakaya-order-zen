
import React from 'react';
import { Bell } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// In a real app, these would come from an API
const notifications = [
  {
    id: '1',
    title: 'Order Ready',
    description: 'Your order #123 is ready for pickup!',
    date: '2 minutes ago',
    type: 'success',
  },
  {
    id: '2',
    title: 'Special Offer',
    description: 'Get 20% off on all sushi rolls today!',
    date: '1 hour ago',
    type: 'info',
  },
  {
    id: '3',
    title: 'Order Status',
    description: 'Your order #122 is being prepared',
    date: '2 hours ago',
    type: 'info',
  },
];

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'success':
      return 'bg-green-100 border-green-200';
    case 'warning':
      return 'bg-yellow-100 border-yellow-200';
    case 'error':
      return 'bg-red-100 border-red-200';
    default:
      return 'bg-blue-50 border-blue-100';
  }
};

const Notifications = () => {
  if (notifications.length === 0) {
    return (
      <Layout>
        <div className="container px-4 py-16 flex flex-col items-center justify-center">
          <Bell className="h-16 w-16 text-izakaya-sand mb-4" />
          <h2 className="text-2xl font-medium mb-2">No notifications</h2>
          <p className="text-izakaya-darkgray">
            You're all caught up! Check back later for updates.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-serif font-medium">Notifications</h1>
          <p className="text-izakaya-darkgray mt-2">通知</p>
        </div>

        <ScrollArea className="h-[calc(100vh-16rem)]">
          <div className="space-y-4">
            {notifications.map((notification) => (
              <Card
                key={notification.id}
                className={`${getNotificationColor(
                  notification.type
                )} transition-all hover:shadow-md cursor-pointer`}
              >
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-medium">
                      {notification.title}
                    </CardTitle>
                    <span className="text-sm text-izakaya-darkgray">
                      {notification.date}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-black/80">
                    {notification.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </Layout>
  );
};

export default Notifications;
