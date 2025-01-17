import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { getSession } from 'next-auth/react';

export const { 
  handlers, 
  auth, 
  signIn, 
  signOut 
} = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
      authorization: {
        url: `${process.env.NEXT_PUBLIC_API_URL}/oauth2/authorization/google`, //백엔드의 OAuth 엔드포인트 사용
        params: {
          developerType: ''
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24  // 1일
  },
  callbacks: {
    async signIn({ user, account }) {
      // OAuth 콜백에서 토큰 받기
      const params = new URLSearchParams(window.location.search);
      const backendAccessToken = params.get('access_token');
      const backendRefreshToken = params.get('refresh_token');

      if (backendAccessToken && backendRefreshToken) {
        // 백엔드 토큰을 user 객체에 저장
        user.accessToken = backendAccessToken;
        user.refreshToken = backendRefreshToken;
      }
      return true;
    },
    // async signIn({ user, account }) { //user: 사용자의 정보, account: OAuth 인증 정보
    //   if (account?.provider === 'google') {
    //     // 여기서 백엔드에 사용자 존재 여부 확인
    //     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/checkUser`, {
    //       method: 'POST',
    //       body: JSON.stringify({ 
    //         googleToken: account.access_token, //구글 API 접근용 액세스 토큰큰
    //         googleId: account.providerAccountId, //구글 ID
    //         name: user.name,
    //         email: user.email,
    //         image: user.image
    //       })
    //     });

    //     if(!response.ok) {
    //       return false; //가입여부 체크 실패
    //     }

    //     const data = await response.json();

    //     //새로운 사용자라면 개발자 선택 페이지로 이동동
    //     if(data.isNewUser) {
    //       user.isNewUser = true;
    //       return true; //로그인은 처리하되, 아래 redirect callback에서 처리
    //     }

    //     // 기존 사용자는 백엔드에서 JWT 토큰 발급
    //     const loginResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
    //       method: 'POST',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         email: user.email,
    //         googleId: account.providerAccountId
    //       }),
    //     });

    //     if (!loginResponse.ok) {
    //       return false;
    //     }

    //     const tokens = await loginResponse.json();

    //     //가입된 계정이라면
    //     //백엔드에서 받은 JWT 토큰을 user 객체에 추가
    //     user.accessToken = tokens.access_token;
    //     user.refreshToken = tokens.refreshToken;
    //     return true;
    //   }
    //   return true
    // },
    // async redirect({ url, baseUrl }) { //signIn 콜백이 true를 반환하면 실행
    //   // 세션에서 isNewUser 확인
    //   const session = await getSession();
    //   if (session?.user?.isNewUser) {
    //     return `${baseUrl}/selectDev`;
    //   }
    //   return `${baseUrl}/home`;
    // },
    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken;
        session.refreshToken = token.refreshToken;
        // 추가 정보
        // session.user.developerType = token.developerType as string;  // 개발자 타입
      }
      return session
    }
  }
})