// 종합강의시간표조회 json 데이터 타입 정의
export type RawCourseItem = {
  SBJ_NO: string;
  SBJ_NM: string;
  CPDIV_CD: string | null;
  DNN_CD: string | null;
  ALL_FULL_PCNT: number | null;
  SBJ_DIV: string | null;
  OPEN_SEM_CD: string | null;
  TMTBL_DSC: string | null;
  DETL_CURI_CD: string | null;
  OPEN_DPTMJR_CD_NM: string | null;
  CDT: string | null;
  OPEN_ORGN_CLSF_CD: string | null;
  ROOM_DSC: string | null;
  OPEN_YY: string | null;
  SCHGRD: string | null;
  REMK: string | null;
  OPEN_DPTMJR_CD: string | null;
  TCHR_DSC: string | null;
  DVCLS: string | null;
  TKCRS_PCNT: number;
};

// 강의실별시간표조회 json 데이터 타입 정의
export type RawClassTimetable = {
  LEC_CHAIR: string;
  CURI_CD_NM: string;
  SBJ_NO: string;
  SBJ_NM: string;
  REMK_DSC: string | null;
  TKCRS_PCNT1: number;
  ALL_FULL_PCNT: number | null;
  TKCRS_PCNT2: number;
  ROOM_NM: string;
  DEPT_NM: string;
  ROOM_CD: string;
  CDT: string;
  DSC: string;
  OBJ_SCHGRD_NM: string;
  PROF_KOR_DSC: string;
  BD_CD: string;
  DVCLS: string;
  TKCRS_PCNT: number;
};
