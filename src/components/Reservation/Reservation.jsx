import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import moment from "moment";
import styled from "@emotion/styled";
import {createRange} from "../../utils/createRange";
import {useUserStore} from "../../store/useUserStore";
import {useNavigate} from "react-router-dom";

const CalenderDiv = styled.div`
  position: fixed;
  //transform: translate(150%, -130%); // 반응형으로 하기 위해 안 씀.
  right: 50px;
  bottom: 40px;
  border-radius: 10px;
  box-shadow:  0px 0px 16px 0px rgba(0, 0, 0, 0.2);
  background-color: white;
  padding: 10px;
  display: block;
  justify-content: center;
  width: 350px;
  height: auto;
  z-index: 1001;
  //filter: blur(5px);
  opacity: 0.5;
  transition: opacity 0.3s ease;
  
  &:hover{
    //filter: blur(0px);
    opacity: 1;
  }
`;


// Styled Components
const StyledCalendar = styled(Calendar)`
  .selected-date {
    background-color: #ff97a8;
    color: white;
    border-radius: 100px; // 모든 선택된 날짜는 동그라미 형태로 표시
  }
  .start-date {
    background-color: #ff97a8;
    color: white;
    border-radius: 100px 0px 0px 100px;
    
  }
  .end-date {
    background-color: #ff97a8;
    color: white;
    border-radius: 0px 100px 100px 0px;
  }
  .in-range {
    color: white;
    background-color: #ff97a8;
  }
`;

const Input = styled.input`
  width: 330px;
  padding: 10px;
  margin-top: 15px;
  border: 1px solid #ccc;
`;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: center;
`;

const CalendarButton = styled.button`
  border: none;
  color: white;
  cursor: pointer;
  padding: 6px 10px;
  letter-spacing: 1px;
  font-size: 15px;
  border-radius: 10px;
  margin: 15px 17px 5px 17px;
  background-color: #4e5fff;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.2);

  &:active {
    box-shadow: none;
    transition: background-color 0.2s ease-out;
  }

  &:last-of-type {
    background-color: #e35b68;
  }
`;

export const Reservation = ({ onSave, onClose, reservations}) => {
    const [content, setContent] = useState('');
    const [selectedRange, setSelectedRange] = useState({ start: null, end: null });
    const [reservedDates, setReservedDates] = useState([]);
    const userId = useUserStore(state => state.userId);

    // 날짜 범위 설정
    useEffect(() => {
        const newReservedDates = reservations.flatMap(reservationList =>
            createRange(reservationList.start, reservationList.end)
        );
        setReservedDates(newReservedDates);
    }, [reservations]);


    // Post.jsx에서 그냥 받아옴
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

    const isRangeValid = (start, end) => {
        if (!start || !end) return true;
        return !reservedDates.some(date =>
            moment(date).isBetween(start, end, 'day', '[]')
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
            // 선택한 범위가 예약이 되어있을 경우 null로 해줌
            const isValid = isRangeValid(startMoment, selectedDate);
            if (!isValid) {
                setSelectedRange({start: null, end: null});
                return;
            }
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
        const startDate = selectedRange.start ? moment(selectedRange.start).format('YYYY-MM-DD') : null;
        const endDate = selectedRange.end ? moment(selectedRange.end).format('YYYY-MM-DD') : null;
        const formattedDate = moment(date).format('YYYY-MM-DD');

        if (startDate && !endDate && startDate === formattedDate) {
            // 시작 날짜만 선택되었을 때 동그라미 형태
            return 'selected-date';
        } else if (startDate === formattedDate && endDate === formattedDate) {
            // 시작과 종료 날짜가 같으면 동그라미 형태
            return 'selected-date';
        } else if (startDate === formattedDate) {
            // 시작 날짜 스타일
            return 'start-date';
        } else if (endDate === formattedDate) {
            // 종료 날짜 스타일
            return 'end-date';
        } else if (isDateInRange(date)) {
            // 범위 안의 날짜 스타일
            return 'in-range';
        }
    };

    const navigate = useNavigate();

    const handleSubmit = () => {

        // 로그인 상태 확인
        if (!userId) {
            // 로그인이 필요하다는 경고 표시
            const isRedirect = window.confirm("로그인이 필요합니다. 로그인 페이지로 이동하시겠습니까?");
            if (isRedirect) {
                navigate('/login');
            }
            return; // 함수 실행 중단
        }

        // 시작 날짜가 설정되지 않은 경우 경고
        if (!selectedRange.start) {
            alert("날짜를 선택해주세요.");
            return; // 함수 실행 중단
        }

        // 종료 날짜가 설정되지 않은 경우, 시작 날짜와 동일하게 설정
        const end = selectedRange.end ? moment(selectedRange.end).format('YYYY-MM-DD') : moment(selectedRange.start).format('YYYY-MM-DD');

        // 내용이 5글자 미만인 경우 경고
        if (content.length < 5) {
            alert("내용은 5글자 이상 입력해주세요.");
            return; // 함수 실행 중단
        }

        const formattedRange = {
            start: moment(selectedRange.start).format('YYYY-MM-DD'),
            end: end,
            content
        };

        onSave(formattedRange);
        console.log(formattedRange);
        onClose();
    };

    return (
        <CalenderDiv>
            <StyledCalendar
                onClickDay={handleDateSelect}
                minDetail="month"
                maxDetail="month"
                tileDisabled={({ date, view }) => view === 'month' && isDateReserved(date)}
                formatDay ={(locale, date) => moment(date).format('DD')} // 일 빼기
                tileClassName={getTileClassName}
            />


            <Input
                type="text"
                placeholder='내용을 입력하세요'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
            <ButtonDiv>
                <CalendarButton onClick={handleSubmit}>확인</CalendarButton>
                <CalendarButton onClick={() => onClose(null)}>닫기</CalendarButton>
            </ButtonDiv>
        </CalenderDiv>
    );
};
