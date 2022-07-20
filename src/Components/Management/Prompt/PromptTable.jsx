import dayjs from 'dayjs';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import { Checkbox } from '@chakra-ui/react';

const DetailBtn = styled.button`
  background-color: #0098fa;
  color: #fff;
  padding: 2px 10px;
  border-radius: 5px;
`;

const PromptTable = ({List, checkedItems, CheckEach})=> {
    return(
        <tbody>
        {List &&
          List.map(item => (
            <tr key={item.name} className="Custom-tr">
              <td className="CheckBox textCenter">
                <Checkbox
                  name="list"
                  value={item.uid}
                  colorScheme="blue"
                  isChecked={checkedItems.includes(item.uid)}
                  onChange={(e) => CheckEach(e, item.uid)}
                />
              </td>
              <td className="textLeft">{item.name}</td>
              <td className="textCenter">관리자</td>
              <td className="textCenter">
                {dayjs(item.create_at).format('YYYY-MM-DD')}
              </td>
              <td className="textCenter">
                {dayjs(item.update_at).format('YYYY-MM-DD')}
              </td>
              <td className="textCenter">
                <Link to={`/prompts/${item.uid}`}><DetailBtn>보기</DetailBtn></Link>
              </td>
            </tr>
          ))}
      </tbody>
    )
}
export default PromptTable;