import React, { useEffect, useState } from 'react'
import { LyricListBody, LyricListBodyItemDiv, LyricThumbnail } from '../../styles/mypageStyle'
import { getLyricList } from '../../api/writingApi'
import { IGetILyricInfoTypes } from '../../types/mypageType'

function MyPageLyricList() {
  const [myLyrics, setMyLyrics] = useState([])
  const [nullLyrics, setNullLyrics] = useState('')

  useEffect(() => {
    async function getMyLyrics() {
      const lyricList = await getLyricList()
      if (lyricList !== null) {
        setMyLyrics(lyricList)
        console.log('마이페이지전체 가사')
      } else {
        console.log('')
        setNullLyrics('새로운 곡을 작사해보세요')
      }
    }
    getMyLyrics()
  }, [])

  return (
      <LyricListBody>
          {nullLyrics ?
            <div>
            {myLyrics.map((myLyric:IGetILyricInfoTypes) => (
              <div key={myLyric.id}>
              <LyricListBodyItemDiv width='200px'>
                <LyricThumbnail src={myLyric.thumbnail} />
              </LyricListBodyItemDiv>
              <LyricListBodyItemDiv width='440px'>
                {myLyric.title}
              </LyricListBodyItemDiv>
              <LyricListBodyItemDiv width='160px'>
                {myLyric.createdDate}
              </LyricListBodyItemDiv>
              <LyricListBodyItemDiv width='160px'>
                {myLyric.updatedDate}
              </LyricListBodyItemDiv>
              <LyricListBodyItemDiv width='160px' />
              </div>
            ))}
            </div>
            : nullLyrics}
      </LyricListBody>
  )
}

export default MyPageLyricList
