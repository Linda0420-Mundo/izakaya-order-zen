import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { CreditCard } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';

const Payment = () => {
  const navigate = useNavigate();
  const { getSubtotal, getTax, getTotal, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    toast.success('Order completed successfully!');
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <Layout>
      <div className="container max-w-lg mx-auto px-4 py-8">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-serif font-medium">Payment</h1>
          <p className="text-sm text-izakaya-darkgray mt-2">お支払い</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup 
                defaultValue={paymentMethod} 
                onValueChange={setPaymentMethod}
                className="space-y-3"
              >
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="credit-card" id="credit-card" />
                  <Label htmlFor="credit-card" className="flex-1 cursor-pointer">Credit Card</Label>
                  <div className="flex gap-2">
                    <img src="https://byfood.b-cdn.net/api/public/assets/18915/content" alt="Visa" className="h-5 w-8 object-contain" />
                    <img src="https://byfood.b-cdn.net/api/public/assets/18915/content" alt="Mastercard" className="h-5 w-8 object-contain" />
                  </div>
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="apple-pay" id="apple-pay" />
                  <Label htmlFor="apple-pay" className="flex-1 cursor-pointer">Apple Pay</Label>
                  <img src="https://byfood.b-cdn.net/api/public/assets/18915/content" alt="Apple Pay" className="h-5 w-8 object-contain" />
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="google-pay" id="google-pay" />
                  <Label htmlFor="google-pay" className="flex-1 cursor-pointer">Google Pay</Label>
                  <img src="https://source.unsplash.com/random/30x20/?googlepay" alt="Google Pay" className="h-5 w-8 object-contain" />
                </div>
                <div className="flex items-center space-x-2 border rounded-md p-3">
                  <RadioGroupItem value="cash" id="cash" />
                  <Label htmlFor="cash" className="flex-1 cursor-pointer">Cash on Delivery</Label>
                </div>
              </RadioGroup>
              
              {paymentMethod === 'credit-card' && (
                <div className="space-y-4 mt-4 pt-4 border-t">
                  <div className="grid gap-2">
                    <Label htmlFor="card-name">Cardholder Name</Label>
                    <Input id="card-name" placeholder="Name on card" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="card-number">Card Number</Label>
                    <Input id="card-number" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-izakaya-darkgray">Subtotal</span>
                  <span>¥{getSubtotal().toFixed(0)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-izakaya-darkgray">Tax (10%)</span>
                  <span>¥{getTax().toFixed(0)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-medium">
                  <span>Total</span>
                  <span>¥{getTotal().toFixed(0)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8">
            <Button
              type="submit"
              className="w-full bg-izakaya-vermilion hover:bg-izakaya-vermilion/90 text-white py-6"
              size="lg"
            >
              Complete Order
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Payment;
