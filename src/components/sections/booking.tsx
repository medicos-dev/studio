
'use client';

import { useState } from 'react';
import ReserveButton from '@/components/ui/reserve-button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { CalendarPopover } from '@/components/ui/calendar';

const BookingSection = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  return (
    <section id="booking" className="py-12 md:py-32 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl md:text-6xl font-bold leading-tight">Reserve Your Moment</h2>
          <p className="mt-3 md:mt-4 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
            Secure your spot at Asterasia. Whether it's a quiet corner for two or a gathering of friends, we're ready to make your visit special.
          </p>
        </div>

        <div className="mt-8 md:mt-12 max-w-4xl mx-auto">
          <div
            className="bg-background p-5 md:p-10 rounded-3xl md:rounded-none"
            style={{
              borderRadius: 'clamp(1.5rem, 5vw, 60%) clamp(1.5rem, 5vw, 40%) clamp(1.5rem, 5vw, 30%) clamp(1.5rem, 5vw, 70%) / clamp(1.5rem, 5vw, 50%) clamp(1.5rem, 5vw, 50%) clamp(1.5rem, 5vw, 50%) clamp(1.5rem, 5vw, 50%)'
            }}
          >
            <form className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Input placeholder="Full Name" className="h-12 md:py-6 rounded-full" />
              <Input type="email" placeholder="Email Address" className="h-12 md:py-6 rounded-full" />
              <Select>
                <SelectTrigger className="h-12 md:py-6 rounded-full border border-input bg-background/50 backdrop-blur-sm hover:bg-muted/50 hover:border-primary/50 transition-all duration-200">
                  <SelectValue placeholder="Number of Guests" />
                </SelectTrigger>
                <SelectContent className="border border-border/30 bg-background/40 backdrop-blur-xl shadow-xl shadow-black/5 rounded-2xl p-1">
                  <SelectItem value="1" className="rounded-xl focus:bg-primary focus:text-primary-foreground cursor-pointer transition-colors m-1">1 Guest</SelectItem>
                  <SelectItem value="2" className="rounded-xl focus:bg-primary focus:text-primary-foreground cursor-pointer transition-colors m-1">2 Guests</SelectItem>
                  <SelectItem value="3" className="rounded-xl focus:bg-primary focus:text-primary-foreground cursor-pointer transition-colors m-1">3 Guests</SelectItem>
                  <SelectItem value="4" className="rounded-xl focus:bg-primary focus:text-primary-foreground cursor-pointer transition-colors m-1">4 Guests</SelectItem>
                  <SelectItem value="5" className="rounded-xl focus:bg-primary focus:text-primary-foreground cursor-pointer transition-colors m-1">5+ Guests (Party Booking)</SelectItem>
                </SelectContent>
              </Select>
              <CalendarPopover
                date={selectedDate}
                onDateChange={setSelectedDate}
                placeholder="Select Date"
                className="h-12"
              />
              <Select>
                <SelectTrigger className="h-12 md:py-6 rounded-full border border-input bg-background/50 backdrop-blur-sm hover:bg-muted/50 hover:border-primary/50 transition-all duration-200">
                  <SelectValue placeholder="Time" />
                </SelectTrigger>
                <SelectContent className="border border-border/30 bg-background/40 backdrop-blur-xl shadow-xl shadow-black/5 rounded-2xl p-1">
                  <SelectItem value="10:00" className="rounded-xl focus:bg-primary focus:text-primary-foreground cursor-pointer transition-colors m-1">10:00 AM</SelectItem>
                  <SelectItem value="12:00" className="rounded-xl focus:bg-primary focus:text-primary-foreground cursor-pointer transition-colors m-1">12:00 PM</SelectItem>
                  <SelectItem value="14:00" className="rounded-xl focus:bg-primary focus:text-primary-foreground cursor-pointer transition-colors m-1">2:00 PM</SelectItem>
                  <SelectItem value="16:00" className="rounded-xl focus:bg-primary focus:text-primary-foreground cursor-pointer transition-colors m-1">4:00 PM</SelectItem>
                  <SelectItem value="18:00" className="rounded-xl focus:bg-primary focus:text-primary-foreground cursor-pointer transition-colors m-1">6:00 PM</SelectItem>
                  <SelectItem value="20:00" className="rounded-xl focus:bg-primary focus:text-primary-foreground cursor-pointer transition-colors m-1">8:00 PM</SelectItem>
                </SelectContent>
              </Select>
              <ReserveButton className="md:col-span-2 w-full h-12 md:h-auto">
                Reserve a Table
              </ReserveButton>
            </form>
            <p className="text-center text-xs md:text-sm text-muted-foreground mt-4 md:mt-6">
              For parties larger than 4, we recommend calling us directly for arrangements.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingSection;
