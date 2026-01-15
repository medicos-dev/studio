
'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Calendar as CalendarIcon } from 'lucide-react';

const BookingSection = () => {
  return (
    <section id="booking" className="py-20 md:py-32 bg-card">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-4xl md:text-6xl font-bold leading-tight">Reserve Your Moment</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Secure your spot at Asterasia. Whether it's a quiet corner for two or a gathering of friends, we're ready to make your visit special.
          </p>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <div className="bg-background p-8 md:p-12" style={{ borderRadius: '60% 40% 30% 70% / 50% 50% 50% 50%' }}>
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input placeholder="Full Name" className="py-6 rounded-full" />
              <Input type="email" placeholder="Email Address" className="py-6 rounded-full" />
              <Select>
                <SelectTrigger className="py-6 rounded-full">
                  <SelectValue placeholder="Number of Guests" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 Guest</SelectItem>
                  <SelectItem value="2">2 Guests</SelectItem>
                  <SelectItem value="3">3 Guests</SelectItem>
                  <SelectItem value="4">4 Guests</SelectItem>
                  <SelectItem value="5">5+ Guests (Party Booking)</SelectItem>
                </SelectContent>
              </Select>
              <Input type="date" placeholder="Date" className="py-6 rounded-full" />
               <Select>
                <SelectTrigger className="py-6 rounded-full">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10:00">10:00 AM</SelectItem>
                  <SelectItem value="12:00">12:00 PM</SelectItem>
                  <SelectItem value="14:00">2:00 PM</SelectItem>
                  <SelectItem value="16:00">4:00 PM</SelectItem>
                  <SelectItem value="18:00">6:00 PM</SelectItem>
                  <SelectItem value="20:00">8:00 PM</SelectItem>
                </SelectContent>
              </Select>
               <Button size="lg" className="md:col-span-2 w-full py-6 text-lg rounded-full">
                Reserve a Table
              </Button>
            </form>
             <p className="text-center text-sm text-muted-foreground mt-6">
                For parties larger than 4, we recommend calling us directly for arrangements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
