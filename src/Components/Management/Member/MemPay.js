import React from 'react';
import Layout from '../../Layout';
import { Box } from '@chakra-ui/react';

const MemPay = () => {
  return (
    <Layout>
      <Box className='PaymentContainer'>
        <Box>
          <div className="payBox">
            <h4>주문번호</h4>
            {/* <p>{payId}</p> */}
          </div>
          <div className="payBox">
            <h4>구독 상품</h4>
            {/* <p>{plan}개월 정기결제</p> */}
          </div>
          <div className="payBox">
            <h4>이용 기간</h4>
            {/* <p>{`${moment(billStart).format('YYYY-MM-DD')} ~ ${exp}`}</p> */}
          </div>
          <div className="payBox" style={{ backgroundColor: '#f9f9f9' }}>
            <h4>주문 총액</h4>
            {/* {plan === '1' && <p>₩ 25,000</p>}
                {plan === '3' && <p>₩ 60,000</p>}
                {plan === '6' && <p>₩ 90,000</p>}
                {plan === 'free' && !stopPay && <p>없음</p>}
                {stopPay && <p>구독 취소</p>} */}
          </div>
          <div className="payBox">
            <h4>주문일시</h4>
            {/* <p>{billStart}</p> */}
          </div>
          <div className="payBox">
            <h4>주문 상태</h4>
            {/* <p>{!stopPay ? `${plan}개월 결제 중` : `구독 취소`}</p> */}
          </div>
          <div className="payBox">
            <h4>결제 수단</h4>
            <p>신용카드/체크카드</p>
          </div>
        </Box>
      </Box>
    </Layout>
  );
};

export default MemPay;
