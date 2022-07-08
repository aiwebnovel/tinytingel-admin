import { forwardRef } from "react";
import { FcCalendar } from 'react-icons/fc';
import moment from 'moment';

export const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button
      style={{ background: 'transparent', border: '0', outline: '0' }}
      onClick={onClick}
      ref={ref}
    >
      <FcCalendar style={{ width: '30px', height: '30px' }}>{moment(value).format('yyyy/MM/DD')}</FcCalendar>
    </button>
  ));

