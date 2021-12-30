import { atom, selector } from "recoil";
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist({
    key:'admin',
    storage:localStorage
})

export const IdState = atom({
    key:'IdState', //구분 되는 고유한 키
    default:'',  //기본 값,
    effects_UNSTABLE: [persistAtom]
})

export const adminId = selector({
    key: 'adminState', // unique ID (with respect to other atoms/selectors)]
    get: ({get})=>{
        const Id = get(IdState);

        return Id;
    }
})