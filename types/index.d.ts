export interface Feature {
  text: string;
  included: boolean;
}

export interface ProfileCardLink {
  name: string;
  url: string;
}

export interface ProfileCardTheme {
  bodyBg: string;
  bodyBgBlur: number;
  bodyBgOpacity: number;
  profileBg: string;
  profileBgBlur: number;
  profileBgOpacity: number;
  textColor: string;
  headingColor: string;
  fontSize: number;
  nameFontSize: number;
  fontFamily: string;
  linkBg: string;
  linkBgBlur: number;
  linkBgOpacity: number;
  linkColor: string;
  linkFontFamily: string;
}

export interface ProfileCardData {
  displayName: string;
  bio: string | null;
  avatar: string | null;
  bodyBgImage: string | null;
  profileBgImage: string | null;
  linkBgImage: string | null;
  customTheme: ProfileCardTheme;
  userlinks?: ProfileCardLink[];
}

export interface ProfileCardProps {
  data?: ProfileCardData;
}
