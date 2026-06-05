'use client';

import { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Gavel,
  FileText,
  Users,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { calendarEvents, getEventTypeColor, type CalendarEventType } from '@/lib/mock-data';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

function getEventIcon(type: CalendarEventType) {
  switch (type) {
    case 'Court Hearing':
      return <Gavel className="w-3.5 h-3.5" />;
    case 'Deadline':
      return <FileText className="w-3.5 h-3.5" />;
    case 'Meeting':
      return <Users className="w-3.5 h-3.5" />;
    case 'Consultation':
      return <CalendarIcon className="w-3.5 h-3.5" />;
  }
}

function getEventBgColor(type: CalendarEventType) {
  switch (type) {
    case 'Court Hearing':
      return 'bg-red-50 text-red-700 border-red-200';
    case 'Deadline':
      return 'bg-orange-50 text-orange-700 border-orange-200';
    case 'Meeting':
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    case 'Consultation':
      return 'bg-sky-50 text-sky-700 border-sky-200';
  }
}

export function CalendarModule() {
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(5); // June (0-indexed)
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [view, setView] = useState<'calendar' | 'list'>('calendar');

  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth);

  const eventsForMonth = useMemo(() => {
    return calendarEvents.filter((e) => {
      const d = new Date(e.date);
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
    });
  }, [currentYear, currentMonth]);

  const eventsByDay = useMemo(() => {
    const map = new Map<number, typeof calendarEvents>();
    eventsForMonth.forEach((e) => {
      const day = new Date(e.date).getDate();
      if (!map.has(day)) map.set(day, []);
      map.get(day)!.push(e);
    });
    return map;
  }, [eventsForMonth]);

  const selectedEventData = calendarEvents.find((e) => e.id === selectedEvent);

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const allEventsSorted = [...calendarEvents].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const calendarCells = [];
  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(<div key={`empty-${i}`} className="min-h-[100px] bg-slate-50/50" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    const dayEvents = eventsByDay.get(day) || [];
    const isToday = day === 5 && currentMonth === 5 && currentYear === 2026;
    calendarCells.push(
      <div
        key={day}
        className={`min-h-[100px] border border-slate-100 p-1.5 transition-colors ${
          isToday ? 'bg-teal-50/50 border-teal-200' : 'bg-white hover:bg-slate-50/50'
        }`}
      >
        <div className="flex items-center justify-between mb-1">
          <span
            className={`text-xs font-semibold inline-flex items-center justify-center w-6 h-6 rounded-full ${
              isToday ? 'bg-teal-600 text-white' : 'text-slate-700'
            }`}
          >
            {day}
          </span>
          {dayEvents.length > 2 && (
            <span className="text-[10px] text-slate-400">+{dayEvents.length - 2} more</span>
          )}
        </div>
        <div className="space-y-0.5">
          {dayEvents.slice(0, 2).map((event) => (
            <button
              key={event.id}
              onClick={() => setSelectedEvent(event.id)}
              className={`w-full text-left text-[10px] px-1.5 py-0.5 rounded border truncate ${getEventBgColor(
                event.type
              )}`}
            >
              {event.title}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Calendar</h2>
          <p className="text-slate-500 mt-1">Court dates, deadlines, and scheduled events</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-0.5">
            <button
              onClick={() => setView('calendar')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                view === 'calendar' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setView('list')}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                view === 'list' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500'
              }`}
            >
              List
            </button>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-3">
        {(['Court Hearing', 'Deadline', 'Meeting', 'Consultation'] as CalendarEventType[]).map(
          (type) => (
            <div key={type} className="flex items-center gap-1.5">
              <div className={`w-2.5 h-2.5 rounded-sm ${getEventBgColor(type).split(' ')[0]}`} />
              <span className="text-xs text-slate-600">{type}</span>
            </div>
          )
        )}
      </div>

      {view === 'calendar' ? (
        /* Calendar View */
        <Card className="border-0 shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold">
                {MONTHS[currentMonth]} {currentYear}
              </CardTitle>
              <div className="flex items-center gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={prevMonth}>
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs h-8"
                  onClick={() => {
                    setCurrentYear(2026);
                    setCurrentMonth(5);
                  }}
                >
                  Today
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8" onClick={nextMonth}>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Day headers */}
            <div className="grid grid-cols-7 mb-1">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-semibold text-slate-500 py-2"
                >
                  {day}
                </div>
              ))}
            </div>
            {/* Calendar grid */}
            <div className="grid grid-cols-7">{calendarCells}</div>
          </CardContent>
        </Card>
      ) : (
        /* List View */
        <Card className="border-0 shadow-sm">
          <CardContent className="p-0">
            <div className="max-h-[600px] overflow-y-auto">
              {allEventsSorted.map((event) => {
                const eventDate = new Date(event.date);
                const isPast = eventDate < new Date('2026-06-05');
                return (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEvent(event.id)}
                    className={`w-full flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors border-b border-slate-100 text-left ${
                      isPast ? 'opacity-60' : ''
                    }`}
                  >
                    <div className="text-center min-w-[56px]">
                      <p className="text-lg font-bold text-teal-600">
                        {eventDate.getDate()}
                      </p>
                      <p className="text-[10px] uppercase text-slate-500 font-medium">
                        {eventDate.toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {getEventIcon(event.type)}
                        <p className="text-sm font-medium text-slate-900">{event.title}</p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {event.location}
                        </span>
                      </div>
                      {event.caseId && (
                        <p className="text-xs text-slate-400 mt-1">
                          Case: {event.caseName}
                        </p>
                      )}
                    </div>
                    <Badge variant="outline" className={`text-[10px] flex-shrink-0 ${getEventTypeColor(event.type)}`}>
                      {event.type}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Event Detail Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-md">
          {selectedEventData && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  {getEventIcon(selectedEventData.type)}
                  {selectedEventData.title}
                </DialogTitle>
                <DialogDescription>Event details</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 mt-2">
                <Badge variant="outline" className={`text-xs ${getEventTypeColor(selectedEventData.type)}`}>
                  {selectedEventData.type}
                </Badge>
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-700">
                      {new Date(selectedEventData.date).toLocaleDateString('en-GB', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-700">{selectedEventData.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-700">{selectedEventData.location}</span>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-slate-600">{selectedEventData.description}</p>
                </div>
                {selectedEventData.caseId && (
                  <>
                    <Separator />
                    <div>
                      <p className="text-xs text-slate-500">Related Case</p>
                      <p className="text-sm font-medium text-teal-700">
                        {selectedEventData.caseId} - {selectedEventData.caseName}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
