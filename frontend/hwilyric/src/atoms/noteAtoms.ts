import { atom, selector } from "recoil"
import { recoilPersist } from 'recoil-persist';
import { ILyricBlockTypes } from "../types/writingType"
import { Default_thumbnail_1 } from "../assets/writeSideBar/writeImg"

const { persistAtom } = recoilPersist();

function getCurrentDateTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const second = String(now.getSeconds()).padStart(2, '0');
    const id = `${year}${month}${day}${hour}${minute}${second}`;
    return Number(id);
}

export const noteIdState = atom<string>({
    key: "noteIdState",
    default: "",
    effects_UNSTABLE: [persistAtom],
})

export const titleState = atom<string>({
    key: "titleState",
    default: "무제",
    effects_UNSTABLE: [persistAtom],
})

export const blockIdState = atom<number>({
    key: 'blockIdState',
    default: getCurrentDateTime()
})

export const blockListState = atom<ILyricBlockTypes[]>({
    key: 'blockListState',
    default: [],
    effects_UNSTABLE: [persistAtom],
})

export const noteThumbnailFileState = atom<File | "">({
    key: "noteThumbnailFileState",
    default: Default_thumbnail_1,
    effects_UNSTABLE: [persistAtom],
})

export const noteThumbnailUrlState = atom<string>({
    key: "noteThumbnailUrlState",
    default: Default_thumbnail_1,
    effects_UNSTABLE: [persistAtom],
})

export const saveTimeState = atom<string>({
    key: "saveTimeState",
    default: ""
})

export const saveTimeSelector = selector({
    key: "saveTimeSelector",
    get: ({ get }) => {
        const originalDate = get(saveTimeState);
        const convertedDate = new Date(originalDate).toLocaleString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour12: true,
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        })
        return convertedDate
    }
})

export const isDarkModeState = atom<boolean>({
    key: "isDarkModeState",
    default: false,
    effects_UNSTABLE: [persistAtom],
})