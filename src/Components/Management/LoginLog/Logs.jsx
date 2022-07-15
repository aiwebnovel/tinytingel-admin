import dayjs from 'dayjs';

const Logs = ({List}) => {
    return(
        <tbody>
        {List.length !== 0 ? (
          List.map(item => (
            <tr key={item.user.user_uid} className="MemberCustom-tr">
              <td className="textCenter">
                {item.user.login_at !== null ? (
                  <p style={{padding: '3px'}}>
                    <span style={{fontWeight: 600}}>{dayjs(item.user.login_at).format(
                      'YYYY-MM-DD'
                    )} </span>
                    <br />
                    {dayjs(item.user.login_at).format('hh:mm:ss')}
                  </p>
                ) : (
                  '기록 없음'
                )}
              </td>
              <td>{item.user.name}</td>
              <td>{item.user.email}</td>
              <td className="textCenter">
                {dayjs(item.user.create_at).format('YYYY-MM-DD')}
              </td>

              <td className="textCenter">
                {item.membership.bill_service !== 'none'
                  ? `${item.membership.current}개월`
                  : "없음"}
              </td>
              <td className="textCenter">
                {item.membership.start_date !== null
                  ? dayjs(item.membership.start_date).format(
                      'YYYY-MM-DD'
                    )
                  : "없음"}
              </td>
              <td className="textCenter">
                {item.membership.start_date !== null
                  ? dayjs(item.membership.start_date).format(
                      'YYYY-MM-DD'
                    )
                  : "없음"}
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
          </tr>
        )}
      </tbody>
    )
}

export default Logs;