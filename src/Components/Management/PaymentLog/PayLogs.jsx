import { Box,Checkbox } from "@chakra-ui/react";
import dayjs from 'dayjs';

const PayLogs = ({searchList, checkedItems, idList,isIndeterminate ,CheckAll, CheckEach}) => {
    return(

      <Box
        overflowX="auto"
        css={{
          '&::-webkit-scrollbar': {
            //스크롤바 전체영역
            width: '5px',
          },
          '&::-webkit-scrollbar-track': {
            //스크롤바 움직이는 영역
            backgroundColor: '#fff',
          },
          '&::-webkit-scrollbar-thumb': {
            //스크롤
            backgroundColor: '#E6F4F1',
            borderRadius: '5px',
          },
        }}
      >
        <table className="MemberCustomTableStyle">
          <thead>
            <tr className="MemberCustom-tr MemberCustom-thead-tr">
              <th className="MemberCheckBox textCenter">
                <Checkbox
                  name="all"
                  value="all"
                  colorScheme="blue"
                  isChecked={checkedItems.length === idList.length}
                  isIndeterminate={isIndeterminate}
                  onChange={CheckAll}
                />
              </th>
              <th className="paymentCustom-th1 textCenter">최초 결제일자</th>
              <th className="paymentCustom-th2 textLeft">회원명</th>
              <th className="paymentCustom-th3 textLeft">이메일</th>
              <th className="paymentCustom-th4 textCenter">구독상품</th>
              <th className="paymentCustom-th5 textCenter">결제금액</th>
              <th className="paymentCustom-th6 textCenter">결제수단</th>
            </tr>
          </thead>
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
              <td className="textCenter">
                {item.user.membership_recent_date !== null &&
                  dayjs(item.user.membership_recent_date).format(
                    'YYYY-MM-DD'
                  )}
                {item.user.membership_recent_date === null &&
                  item.membership.start_date === null &&
                  '없음'}
                {item.user.membership_recent_date === null &&
                  item.membership.start_date !== null &&
                  dayjs(item.membership.start_date).format('YYYY-MM-DD')}
              </td>
              <td>{item.user.name}</td>
              <td>{item.user.email}</td>
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
                {item.membership.bill_service === 'none' && '없음'}
                {item.membership.bill_service !== 'none' &&
                  item.membership.current === 1 &&
                  '25,000'}
                {item.membership.bill_service !== 'none' &&
                  item.membership.current === 3 &&
                  '60,000'}
                {item.membership.bill_service !== 'none' &&
                  item.membership.current === 6 &&
                  '90,000'}

                {item.membership.bill_service !== 'none' &&
                  item.membership.current === 0 &&
                  item.membership.before === 1 &&
                  '25,000'}
                {item.membership.bill_service !== 'none' &&
                  item.membership.current === 0 &&
                  item.membership.before === 3 &&
                  '60,000'}
                {item.membership.bill_service !== 'none' &&
                  item.membership.current === 0 &&
                  item.membership.before === 6 &&
                  '90,000'}
              </td>
              <td className="textCenter">
                {item.membership.bill_service === 'none' && '없음'}
                {item.membership.bill_service !== 'none' &&
                  item.membership.bill_service === 'iamport' &&
                  '카카오페이'}
                  {item.membership.bill_service !== 'none' &&
                  item.membership.bill_service === 'kakao' &&
                  '카카오페이'}
                {item.membership.bill_service !== 'none' &&
                  item.membership.bill_service === 'innopay' &&
                  '신용/체크'}
                   {item.membership.bill_service !== 'none' &&
                  item.membership.bill_service === 'inicis' &&
                  '신용/체크'}
                {item.membership.bill_service !== 'none' &&
                  item.membership.bill_service === 'nopassbook' &&
                  '무통장'}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td></td>
            <td></td>
            <td>결과가 없습니다</td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        )}
      </tbody>
      </table>
    </Box>
    )
}

export default PayLogs;