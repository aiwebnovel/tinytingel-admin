import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import {Checkbox,} from '@chakra-ui/react';
  import {InfoIcon} from '@chakra-ui/icons';

const MemberTable = ({searchList, checkedItems, CheckEach}) => {
    return(
        <tbody>
        {searchList.length !== 0 ? (
          searchList.map(item => (
            <tr key={item.user.user_uid} className="MemberCustom-tr">
              <td className="CheckBox textCenter">
                <Checkbox
                  name="list"
                  value={item.user.user_uid}
                  colorScheme="blue"
                  isChecked={checkedItems.includes(item.user.user_uid)}
                  onChange={e => CheckEach(e, item.user.user_uid)}
                />
              </td>
              <td>{item.user.name}</td>
              <td>{item.user.email}</td>
              <td className="textCenter">
                {dayjs(item.user.create_at).format('YYYY-MM-DD')}
              </td>
              <td className="textCenter">
                {item.user.login_at !== null
                  ? dayjs(item.user.login_at).format('YYYY-MM-DD')
                  : '기록 없음'}
              </td>
              <td className="textCenter">
                {item.membership.bill_service === 'none' && '없음'}
                {item.membership.bill_service !== 'none' &&
                  item.membership.current > 0 &&
                  `${item.membership.current}개월`}
                {item.membership.bill_service !== 'none' &&
                  item.membership.current === 0 &&
                  item.membership.before > 0 &&
                  `${item.membership.before}개월`}
              </td>
              <td className="textCenter">
                {/* 최초 구독, 최근 결제 없음 */}
              {item.user.membership_recent_date === null &&
                  item.membership.start_date === null &&
                  '없음'}

                {/* 최초 구독 있음, 최근결제 없음  */}
                {item.membership.start_date !== null 
                && item.user.membership_recent_date === null
                && dayjs(item.membership.start_date).format(
                      'YYYY-MM-DD'
                )}
             {/* 최초 구독 없음 , 최근 결제 있음 (start_date null인 경우_무통장) */}
                   {item.membership.start_date === null 
                && item.user.membership_recent_date !== null
                && dayjs(item.user.membership_recent_date).format(
                      'YYYY-MM-DD'
                )}
              {/* 최초 구독, 최근 결제 있음 */}
                {item.user.membership_recent_date !== null &&
                item.membership.start_date !== null &&
                  dayjs(item.membership.start_date).format(
                    'YYYY-MM-DD'
                  )}
              </td>
              <td className="textCenter">
                {/* 최초 구독, 최근 결제 없음 */}
              {item.user.membership_recent_date === null &&
                  item.membership.start_date === null &&
                  '없음'}
                {/* 최초 구독 있음, 최근결제 없음  */}
                {item.user.membership_recent_date !== null &&
                item.membership.start_date === null &&
                  dayjs(item.user.membership_recent_date).format(
                    'YYYY-MM-DD'
                  )}
             {/* 최초 구독 없음 , 최근 결제 있음 (start_date null인 경우_무통장) */}
                {item.user.membership_recent_date === null &&
                item.membership.start_date !== null &&
                  dayjs(item.membership.start_date).format('YYYY-MM-DD')}
                   {/* 최초 구독, 최근 결제 있음 */}
                {item.user.membership_recent_date !== null &&
                item.membership.start_date !== null &&
                  dayjs(item.user.membership_recent_date).format(
                    'YYYY-MM-DD'
                  )}

              </td>
              <td className="textCenter">
                <Link to={`/members/${item.user.user_uid}`}>
                  <InfoIcon w={5} h={5} />
                </Link>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>결과가 없습니다</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )}
      </tbody>
    )
}

export default MemberTable;