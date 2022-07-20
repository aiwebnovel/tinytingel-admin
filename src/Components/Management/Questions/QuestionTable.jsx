import { Link } from 'react-router-dom';

const QuestionTable = ({listAll}) => {
    return(
        <tbody>
              {listAll.length !== 0 ? (
                listAll.map(item => (
                  <tr
                    className={`QuestionCustom-tr textCenter ${item.status}Question`}
                    key={item.inquiry_uid}
                  >
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.category}</td>
                    <td>
                      {item.status === 'unchecked' && '미확인'}
                      {item.status === 'checked' && '확인'}
                      {item.status === 'answered' && '답변 완료'}
                    </td>
                    <td className="textLeft hoverUnderline">
                      <Link to={`/questions/${item.inquiry_uid}`}>
                        {item.content.length > 20 &&
                          item.content.substring(0, 21)}
                        {item.content.length < 20 && item.content}
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="QuestionCustom-tr textCenter">
                  <td></td>
                  <td></td>
                  <td>결과가 없습니다.</td>
                  <td></td>
                  <td></td>
                </tr>
              )}
            </tbody>
    );
}

export default QuestionTable;