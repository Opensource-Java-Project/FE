import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import styled from "@emotion/styled";

// Styled Components
const StyledCalendar = styled(Calendar)`
  .start-date, .end-date {
    background-color: darkblue;
    color: white;
  }
  .in-range {
    background-color: lightblue;
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 10px;
  margin-right: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:last-of-type {
    background-color: #dc3545;
  }
`;

export const Reservation = ({ onSave, onClose, getReservedDates }) => {
    const [content, setContent] = useState('');
    const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
    const [reservedDates, setReservedDates] = useState([]);


    // for test
    useEffect(() => {
        const dummyReservedDates = ["2023-12-24", "2023-12-25", "2023-12-31"];
        setReservedDates(dummyReservedDates.map(d => new Date(d)));
    }, []);



    // useEffect(() => {
    //     // 백엔드에서 예약된 날짜들을 가져오는 로직
    //     const fetchReservedDates = async () => {
    //         const dates = await getReservedDates();
    //         setReservedDates(dates.map(d => new Date(d)));
    //     };
    //     fetchReservedDates();
    // }, [getReservedDates]);

    const isDateReserved = (date) => {
        return reservedDates.some(reservedDate =>
            date.getFullYear() === reservedDate.getFullYear() &&
            date.getMonth() === reservedDate.getMonth() &&
            date.getDate() === reservedDate.getDate()
        );
    };

    const handleDateSelect = (value) => {
        const selectedDate = moment(value);
        const startMoment = selectedRange.start ? moment(selectedRange.start) : null;
        const endMoment = selectedRange.end ? moment(selectedRange.end) : null;

        if (!startMoment || endMoment) {
            // 시작 날짜가 설정되지 않았거나 종료 날짜가 이미 설정된 경우
            setSelectedRange({ start: value, end: null });
        } else if (selectedDate.isBefore(startMoment, 'day')) {
            // 선택된 날짜가 현재 시작 날짜보다 이전인 경우
            setSelectedRange({ start: value, end: null });
        } else {
            // 그 외의 경우, 선택된 날짜를 종료 날짜로 설정
            setSelectedRange({ ...selectedRange, end: value });
        }
    };


    const isDateInRange = (date) => {
        const { start, end } = selectedRange;
        if (!start || !end) return false;
        const momentDate = moment(date);
        const startMoment = moment(start);
        const endMoment = moment(end);
        return momentDate.isAfter(startMoment) && momentDate.isBefore(endMoment);
    };

    const getTileClassName = ({ date, view }) => {
        if (view !== 'month') return '';
        if (moment(date).isSame(selectedRange.start, 'day')) {
            return 'start-date';
        } else if (moment(date).isSame(selectedRange.end, 'day')) {
            return 'end-date';
        } else if (isDateInRange(date)) {
            return 'in-range';
        }
    };

    const handleSubmit = () => {
        onSave({ ...selectedRange, content });
        onClose();
    };

    return (
        <div>
            <StyledCalendar
                onClickDay={handleDateSelect}
                minDetail="month"
                maxDetail="month"
                tileDisabled={({ date, view }) => view === 'month' && isDateReserved(date)}
                tileClassName={getTileClassName}
            />
            <Input
                type="text"
                placeholder='내용을 입력하세요'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <div>
                <Button onClick={handleSubmit}>확인</Button>
                <Button onClick={() => onClose(null)}>닫기</Button>
            </div>
        </div>
    );
};
