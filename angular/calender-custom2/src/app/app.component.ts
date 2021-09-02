import { Component } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/angular';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { StaffProfile } from './staff';
import bootstrapPlugin from '@fullcalendar/bootstrap';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  staffProfiles: StaffProfile[] = [
    {
      id: 1,
      name: 'staff 1',
      image: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1493458748-beauty-face-517.jpg',
      booking: [
        {
          id: 1,
          title: 'hair cut',
          start: '',
          end:  ''
        },
        {
          id: 2,
          title: 'hair cut',
          start: '',
          end:  ''
        },
        {
          id: 3,
          title: 'hair cut',
          start: '',
          end:  ''
        }
      ],
    },
    {
      id: 2,
      name: 'staff 1',
      image: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1493458748-beauty-face-517.jpg',
      booking: [
        {
          id: 1,
          title: 'hair cut',
          start: '',
          end:  ''
        }
      ],
    },
    {
      id: 1,
      name: 'staff 1',
      image: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1493458748-beauty-face-517.jpg',
      booking: [
        {
          id: 3,
          title: 'hair cut',
          start: '',
          end:  ''
        }
      ],
    },
    {
      id: 4,
      name: 'staff 1',
      image: 'https://www.thestatesman.com/wp-content/uploads/2017/08/1493458748-beauty-face-517.jpg',
      booking: [
        {
          id: 1,
          title: 'hair cut',
          start: '',
          end:  ''
        }
      ],
    },



  ]
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    themeSystem: 'bootstrap',
    initialView: 'timeGridWeek',
    plugins:[ bootstrapPlugin ],
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: false,
    select: this.addEvent.bind(this),
    eventClick: this.deleteEvents.bind(this),
    eventsSet: this.allEventSet.bind(this)
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  onHover(staffProfile: StaffProfile): void{
    console.log(staffProfile.name);
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  addEvent(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: createEventId(),
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      });
    }
    console.log('adding an event to the staff member');
  }

  deleteEvents(clickInfo: EventClickArg) {
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove();
    }
  }

  allEventSet(events: EventApi[]) {
    this.currentEvents = events;
  }

}
