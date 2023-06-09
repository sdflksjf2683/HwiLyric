import { useRecoilValue, useRecoilState, useSetRecoilState, useResetRecoilState } from "recoil"
import SimilarItem from "./SimilarList"
import { blockListState } from "../../../atoms/noteAtoms"
import { similarListState, similarListLengthState, checkLoadingState } from "../../../atoms/sidebarAtoms"
import { ISimilarityTypes } from "../../../types/writingType"
import { checkSimilarity } from "../../../api/writingApi"
import { CheckButton } from "../../../styles/common/ButtonStyle"
import { SimilarListBox } from "../../../styles/writeSidebarStyle"

function CheckSimilarity() {
    
    const blockList = useRecoilValue(blockListState)
    const [similarList, setSimilarList] = useRecoilState(similarListState)
    const setSimilarListLength = useSetRecoilState(similarListLengthState)
    const setCheckLoadingState = useSetRecoilState(checkLoadingState)

    const resetCheckLoading = useResetRecoilState(checkLoadingState)
    const resetSimilarList = useResetRecoilState(similarListState)
    const resetSimilarListLength = useResetRecoilState(similarListLengthState)

    const getUserLyrics = () => {
        const lyrics = blockList.filter(block => block.lyrics !== null).map((block => block.lyrics!))
        return lyrics
    }

    const onCheck = async () => {
        resetCheckLoading()
        resetSimilarList()
        resetSimilarListLength()
        setCheckLoadingState(true)
        const lyrics = await getUserLyrics()
        const body: ISimilarityTypes = {
            userLyric: lyrics
        }      
        try {
            const data = await checkSimilarity(body);
            setSimilarList(data.similarList);
            await setSimilarListLength(data.similarList.length);
            await setCheckLoadingState(false);
            return data;
        } catch (err: any) {
            resetSimilarListLength()
            alert ("유사한 가사가 없습니다.\n3글자 이상 작성 또는 특수 문자를 제거하고 다시 시도해주세요!")
            await setCheckLoadingState(false);
        }
    }
    
    return (
        <>
            <CheckButton onClick={onCheck}>유사도 검사하기</CheckButton>
            {(similarList) ? (
                <SimilarListBox>
                    {similarList.map((similar, index) => (                             
                        <SimilarItem key={index} similar = {similar} />
                    ))}
                </SimilarListBox>
            ) : (<></>)
            }
        </>
    )
}

export default CheckSimilarity