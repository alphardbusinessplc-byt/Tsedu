import type { ImageData } from '@/components/ui/img-sphere';

const BASE = import.meta.env.BASE_URL; // '/' in dev, './' in build

const CHILD_FILES = [
  '20140927_133917-1.jpg', '20140927_133925.jpg', '20140927_134032-1.jpg', '20140927_134054-1.jpg',
  '20150613_155720.jpg', '20150613_161042.jpg', '20150613_163241.jpg', 'IMG_5329.JPG',
  'MYXJ_20180512080122_fast.jpg', 'MYXJ_20180512084558_fast.jpg',
  'WIN_20090503_13_52_12_Pro.jpg', 'WIN_20090503_14_39_55_Pro.jpg', 'WIN_20090801_12_08_16_Pro.jpg',
  'WIN_20091017_13_30_03_Pro.jpg', 'WIN_20091102_00_21_49_Pro.jpg', 'WIN_20091228_07_19_12_Pro.jpg',
  'WIN_20100308_12_48_39_Pro.jpg', 'WIN_20100308_12_51_16_Pro (2).jpg', 'WIN_20100516_14_26_32_Pro.jpg',
  'WIN_20100717_07_35_52_Pro.jpg', 'WIN_20101025_10_33_29_Pro.jpg', 'WIN_20101025_10_34_04_Pro.jpg',
  'WIN_20101109_08_38_44_Pro.jpg', 'WIN_20101109_08_38_48_Pro.jpg', 'WIN_20101109_08_38_57_Pro.jpg',
  'WIN_20101109_08_39_15_Pro.jpg', 'WIN_20101109_08_40_09_Pro.jpg', 'WIN_20101109_08_40_20_Pro.jpg',
  'WIN_20101109_08_40_48_Pro.jpg', 'WIN_20101109_08_40_51_Pro.jpg', 'WIN_20101109_08_43_13_Pro.jpg',
  'WIN_20101109_08_44_57_Pro.jpg', 'WIN_20101109_08_45_54_Pro.jpg', 'WIN_20101109_08_46_15_Pro.jpg',
  'WIN_20101109_08_50_27_Pro.jpg',
];

const RECENT_FILES = [
  '20210429_103912_0.jpg', '20210429_104012_0.jpg', '20210429_105202_0.jpg', '20220119_123634.jpg',
  'B612_20210311_111755.jpg', 'B612_20210502_122048.jpg', 'IMG_20200114_102608_846.jpg',
  'IMG_20200422_205026_070.jpg', 'IMG_20200422_205032_165.jpg', 'IMG_20200422_205122_271.jpg',
  'IMG_20200422_205454_722.jpg', 'IMG_20200422_210153_528.jpg', 'IMG_20200422_210215_982.jpg',
  'IMG_20200423_130407 - Copy.jpg', 'IMG_20200507_111832.jpg', 'IMG_20220111_142016_914.jpg',
  'faceu_0_20201221125357.jpg', 'faceu_0_20201221125543.jpg',
  'ice_2021-02-12-11-12-16-653.jpg', 'ice_2021-02-12-11-13-24-294.jpg', 'ice_2021-02-21-14-55-43-523.jpg',
  'ice_2021-03-06-19-04-05-925.jpg', 'ice_2021-03-14-19-38-18-997.jpg', 'ice_2021-03-14-19-39-41-123.jpg',
  'ice_2021-03-14-19-42-19-948.jpg', 'ice_2021-03-14-19-47-17-723.jpg', 'ice_2021-03-14-19-51-04-301.jpg',
  'ice_2021-03-14-19-54-22-663.jpg', 'ice_2021-03-14-20-05-40-947.jpg', 'ice_2021-03-27-06-51-51-916.jpg',
  'ice_2021-04-29-11-01-58-086.jpg', 'ice_2021-05-02-12-32-39-999.jpg', 'ice_2021-06-05-19-53-36-723.jpg',
];

const url = (folder: string, file: string) => {
  const base = BASE.endsWith('/') ? BASE : BASE + '/';
  return `${base}${folder}/${encodeURIComponent(file)}`;
};

export const CHILD_PHOTOS: ImageData[] = CHILD_FILES.map((f, i) => ({
  id: `child-${i}`,
  src: url('tseduchild', f),
  alt: 'Little Tsedu',
}));

export const RECENT_PHOTOS: ImageData[] = RECENT_FILES.map((f, i) => ({
  id: `recent-${i}`,
  src: url('tsedi_in_semera', f),
  alt: 'Tsedu',
}));

export const ALL_PHOTOS: ImageData[] = [...CHILD_PHOTOS, ...RECENT_PHOTOS];
