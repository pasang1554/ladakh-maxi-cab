import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { Calendar, Car, Star, Info, User, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';

const packages = [
  {
    name: 'Silver Package',
    price: '20,000',
    duration: '3 Nights 4 Days',
    vehicle: 'Mahindra Xylo & Scorpio available',
    highlights: [
      'Evening Leh Local Sightseeing',
      'Leh to Sham Valley',
      'Leh to Pangong Lake',
    ],
    itinerary: [
      {
        day: 'Day 1',
        details: [
          'Arrival Leh AirPort transfer to hotel',
          'Rest for acclimatization after lunch',
          'Leh-Ladakh local sightseeing: Shanti Stupa, Leh Palace, Leh Market',
          'Overnight stay at Leh hotel',
        ],
      },
      {
        day: 'Day 2',
        details: [
          'Leh to Sham valley tour: Hall of Fame, Spituk Monastery, Gurudwara Pathar Sahib, Magnetic Hill, Sangam Point',
          'Overnight stay at Leh hotel',
        ],
      },
      {
        day: 'Day 3',
        details: [
          'Leh to World famous Pangong Lake: Via Changla Pass same day return to Leh.',
          'Overnight stay at Leh hotel',
        ],
      },
      {
        day: 'Day 4',
        details: ['Departure to Delhi (AirPort Drop)'],
      },
    ],
    notes: [
      'Extra route pricing will be applicable.',
      'We do not provide accommodation or stay.',
      'Due to natural calamities, any extra route changes – extra charges will be applicable.',
      'According to the Ladakh government, acclimatization for two days is mandatory.',
      'Below 5 years child is not allowed.',
      'In case of cancellation: two weeks before, we offer a full refund. If cancellation occurs a week before, we offer a 75% refund.',
      'Oxygen cylinder extra charges will be Rs 3000/set',
    ],
  },
  {
    name: 'Gold Package',
    price: '35,000',
    duration: '4 Nights 5 Days',
    vehicle: 'Toyota Innova & Tata Aria available',
    highlights: [
      'Evening Leh Local Sightseeing',
      'Leh to Sham Valley upto Alchi',
      'Leh to Nubra Valley',
      'Nubra Valley to Pangong Lake',
    ],
    itinerary: [
      {
        day: 'Day 1',
        details: [
          'Arrival Leh AirPort transfer to hotel',
          'Rest for acclimatization after lunch',
          'Leh-Ladakh local sightseeing: Shanti Stupa, Leh Palace, Leh Market, Tsemo royal Monastery',
          'Overnight stay at Leh hotel',
        ],
      },
      {
        day: 'Day 2',
        details: [
          'Leh to Sham Valley tour upto Alchi: Hall of Fame, Spituk Monastery, Gurudwara Pathar Sahib, Magnetic Hill, Sangam Point, Likir monastery, Alchi Monastery',
          'Overnight stay at Leh hotel',
        ],
      },
      {
        day: 'Day 3',
        details: [
          'Leh to Nubra valley: Khardungla Pass, Diskit Monastery, White desert sand dunes Hunder',
          'Overnight stay at Hunder Nubra',
        ],
      },
      {
        day: 'Day 4',
        details: [
          'Nubra valley to Pangong Lake: Via Shayok road same day return back to leh',
          'Overnight stay at Leh hotel',
        ],
      },
      {
        day: 'Day 5',
        details: ['Departure [AirPort drop]'],
      },
    ],
    notes: [
      'Extra route pricing will be applicable.',
      'We do not provide accommodation or stay.',
      'Natural Calamities – Extra Route Changes – Extra Fees will be applicable',
      'According to the Leh government, acclimatization for two days is mandatory.',
      'Below 5 Years Child not allowed',
      'In case of cancellation two weeks before arrival, we offer a full refund. If cancellation occurs a week before, we offer a 75% refund.',
      'Oxygen Cylinder Extra – Rs 3000/set',
    ],
  },
  {
    name: 'Diamond Package',
    price: '38,000',
    duration: '5 Nights 6 Days',
    vehicle: 'Toyota Crysta & XUV available',
    highlights: [
      'Evening Leh Local Sightseeing',
      'Leh to Sham Valley upto Alchi',
      'Leh to Nubra Valley',
      'Nubra Valley to Pangong Lake',
      'Pangong to Leh via Changla Pass',
    ],
    itinerary: [
      {
        day: 'Day 1',
        details: [
          'Arrival Leh AirPort transfer to hotel',
          'Rest for acclimatization after lunch',
          'Leh-Ladakh local sightseeing: Shanti Stupa, Leh Palace, Leh Market, Tsemo royal Monastery',
          'Overnight stay at Leh hotel',
        ],
      },
      {
        day: 'Day 2',
        details: [
          'Leh to Sham Valley tour upto Alchi: Hall of Fame, Spituk Monastery, Gurudwara Pathar Sahib, Magnetic Hill, Sangam Point, Likir monastery, Alchi Monastery',
          'Overnight stay at Leh hotel',
        ],
      },
      {
        day: 'Day 3',
        details: [
          'Leh to Nubra valley: Khardungla Pass, Diskit Monastery, White desert sand dunes Hunder',
          'Overnight stay at Hunder Nubra',
        ],
      },
      {
        day: 'Day 4',
        details: [
          'Nubra valley to Pangong Lake: Via Shayok road after lunch Pangong Lake sightseeing by walk',
          'Overnight stay at Pangong',
        ],
      },
      {
        day: 'Day 5',
        details: [
          'Pangong to Leh via Changla Pass & sightseeing: Hamis Monastery, Thiksey Monastery, Rancho School, Shay Palace',
          'Overnight Stay at Leh hotel',
        ],
      },
      {
        day: 'Day 6',
        details: ['Departure (AirPort drop)'],
      },
    ],
    notes: [
      'Extra route pricing will be applicable.',
      'We do not provide accommodation or stay.',
      'Natural Calamities – Extra Route Changes – Extra Fees will be applicable',
      'According to the Leh government, acclimatization for two days is mandatory.',
      'Below 5 Years Child not allowed',
      'In case of cancellation two weeks before arrival, we offer a full refund. If cancellation occurs a week before, we offer a 75% refund.',
      'Oxygen Cylinder Extra – Rs 3000/set',
    ],
  },
];

const vehicleIcon = (vehicle: string) => {
  if (vehicle.toLowerCase().includes('scorpio') || vehicle.toLowerCase().includes('innova') || vehicle.toLowerCase().includes('car') || vehicle.toLowerCase().includes('xylo') || vehicle.toLowerCase().includes('aria') || vehicle.toLowerCase().includes('crysta') || vehicle.toLowerCase().includes('xuv')) {
    return <Car className="inline w-4 h-4 mr-1 text-blue-500" />;
  }
  return <Star className="inline w-4 h-4 mr-1 text-yellow-500" />;
};

export default function TourPackages() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookedPackage, setBookedPackage] = useState<string | null>(null);
  const [canSendWhatsApp, setCanSendWhatsApp] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Enable WhatsApp button only if required fields are filled
    setCanSendWhatsApp(
      !!form.name && !!form.email && !!form.phone && !!selected
    );
  }, [form, selected]);

  const handleBook = (pkgName: string) => {
    setSelected(pkgName);
    setOpen(true);
    setForm({ name: '', email: '', phone: '', message: '' });
    setSuccess(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setError(null);
    try {
      const res = await fetch('/api/book-tour', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, package: selected }),
      });
      if (res.ok) {
        setSuccess(true);
        setBookedPackage(selected);
      } else {
        const data = await res.json();
        setError(data.error || 'Booking failed. Please try again.');
      }
    } catch (err) {
      setError('Booking failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const whatsappNumber = '8492008932';
  const whatsappMsg = encodeURIComponent(
    `New Tour Booking!\nPackage: ${selected}\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nMessage: ${form.message}`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMsg}`;

  return (
    <section className="py-12 bg-gradient-to-br from-blue-50 via-white to-yellow-50">
      <h2 className="text-4xl font-extrabold text-center mb-10 bg-gradient-to-r from-blue-600 via-pink-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-lg">Tour Packages</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg, idx) => (
          <Card
            key={pkg.name}
            className={`relative flex flex-col shadow-xl border-0 overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-2xl bg-white ${idx === 1 ? 'bg-gradient-to-br from-yellow-50 via-pink-50 to-blue-50' : 'bg-gradient-to-br from-white to-blue-50'}`}
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400" />
            <CardHeader className="flex flex-col items-center justify-center pt-8 pb-2">
              <Badge variant="default" className="mb-2 text-base px-4 py-1 bg-gradient-to-r from-blue-500 to-pink-500 text-white shadow">{pkg.name}</Badge>
              <CardTitle className="text-2xl font-bold text-center mb-1">{pkg.duration}</CardTitle>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-lg px-3 py-1 bg-yellow-400/90 text-yellow-900 shadow">₹{pkg.price}</Badge>
                <span className="inline-flex items-center text-sm text-blue-700 font-medium bg-blue-100 rounded px-2 py-0.5 ml-2">{vehicleIcon(pkg.vehicle)}{pkg.vehicle}</span>
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              <div className="mb-3">
                <span className="font-semibold text-gray-700">Highlights:</span>
                <ul className="list-disc list-inside text-sm text-gray-600 mt-1 space-y-1">
                  {pkg.highlights.map((h, i) => <li key={i}>{h}</li>)}
                </ul>
              </div>
              <div className="mb-3">
                <span className="font-semibold text-gray-700 flex items-center gap-2 mb-1">
                  <Star className="w-4 h-4 text-pink-500" /> What's Included
                </span>
                <span className="font-semibold text-gray-700">Itinerary:</span>
                <ol className="border-l-2 border-blue-300 pl-4 mt-1 space-y-4">
                  {pkg.itinerary.map((day, i) => (
                    <li key={i} className="relative pb-2">
                      <span className="absolute -left-3 top-1 w-3 h-3 bg-blue-400 rounded-full border-2 border-white"></span>
                      <span className="font-semibold text-blue-700">{day.day}:</span>
                      <ul className="list-disc list-inside text-gray-600 ml-4 mt-1">
                        {day.details.map((detail, j) => (
                          <li key={j}>{detail}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ol>
              </div>
              <div className="mb-3">
                <div className="flex items-center gap-2 mb-1">
                  <Info className="w-4 h-4 text-yellow-500" />
                  <span className="font-semibold text-gray-700">Important Notes:</span>
                </div>
                <ul className="bg-yellow-50 border-l-4 border-yellow-400 p-2 rounded text-xs text-gray-700 space-y-1">
                  {pkg.notes.map((note, i) => <li key={i}>{note}</li>)}
                </ul>
              </div>
              <Button
                className="mt-auto w-full py-2 text-lg font-bold bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-500 text-white shadow-lg hover:from-blue-600 hover:to-yellow-600 animate-pulse"
                onClick={() => handleBook(pkg.name)}
                disabled={bookedPackage === pkg.name}
              >
                {bookedPackage === pkg.name ? 'Booked' : `Book ${pkg.name.split(' ')[0]} Tour Package`}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">Book {selected}</DialogTitle>
          </DialogHeader>
          {success ? (
            <div className="text-green-600 text-center space-y-4">
              <p className="text-lg font-semibold">Your booking request has been sent! We will contact you soon.</p>
              <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="w-full flex items-center justify-center gap-2"><FaWhatsapp className="w-5 h-5 text-green-600" />Send on WhatsApp</Button>
              </a>
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {error && <div className="text-red-600 text-center font-semibold">{error}</div>}
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input name="name" value={form.name} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Phone</label>
                <input name="phone" value={form.phone} onChange={handleChange} required className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium">Package</label>
                <input value={selected || ''} readOnly className="w-full border rounded px-3 py-2 bg-gray-100" />
              </div>
              <div>
                <label className="block text-sm font-medium">Message</label>
                <textarea name="message" value={form.message} onChange={handleChange} rows={3} className="w-full border rounded px-3 py-2" />
              </div>
              <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 via-pink-500 to-yellow-500 text-white font-bold text-lg shadow-lg hover:from-blue-600 hover:to-yellow-600" disabled={submitting}>{submitting ? 'Booking...' : 'Book Now'}</Button>
              <a
                href={canSendWhatsApp ? whatsappLink : undefined}
                target="_blank"
                rel="noopener noreferrer"
                title={canSendWhatsApp ? 'Open WhatsApp to send your booking.' : 'Please fill the form before sending on WhatsApp.'}
                className={
                  'w-full mt-2 flex items-center justify-center gap-2 ' +
                  (canSendWhatsApp ? '' : 'pointer-events-none opacity-50')
                }
              >
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2 text-green-600 border-green-400 font-bold text-lg shadow hover:bg-green-50"
                  type="button"
                  disabled={!canSendWhatsApp}
                >
                  <FaWhatsapp className="w-5 h-5 text-green-600" />Send on WhatsApp
                </Button>
              </a>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
} 