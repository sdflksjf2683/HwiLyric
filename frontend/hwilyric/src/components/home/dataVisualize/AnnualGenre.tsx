import AnnualGenreChart from "./AnnualGenreChart";
import { AnnualGenreDiv } from "../../../styles/DataVisaulizeStyle";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { annualGenreRatioSongAtom } from "../../../atoms/visualizingGenreAtom";
import {
  annualNowAtom,
  annualNowSongAtom,
} from "../../../atoms/visualizingAtoms";
import AnnualGenreSongs from "./AnnualGenreSongs";
import { useTheme } from "styled-components";

function AnnualGenre(props: any) {
  const annualnow = useRecoilValue(annualNowAtom);
  const setAnnualNowSong = useSetRecoilState(annualNowSongAtom);
  const data = useRecoilValue(annualGenreRatioSongAtom);
  const chartData = [];
  let songData = {};
  let cnt = 0;
  let ratioRemain = 1;
  for (const i of data[annualnow]) {
    chartData.push({ id: i.name, label: i.name, value: i.ratio });
    songData = { ...songData, [i.name]: i.songs };
    ratioRemain -= i.ratio;
    cnt++;
    if (cnt == 5) {
      chartData.push({ id: "기타", label: "기타", value: ratioRemain });
      break;
    }
  }
  setAnnualNowSong(chartData[0].id);
  const theme = useTheme();
  return (
    <AnnualGenreDiv theme={theme}>
      <AnnualGenreChart data={chartData}></AnnualGenreChart>
      <AnnualGenreSongs data={songData}></AnnualGenreSongs>
    </AnnualGenreDiv>
  );
}

export default AnnualGenre;
