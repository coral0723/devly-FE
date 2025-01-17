import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

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
        params: {
          prompt: 'consent'  // 사용자에게 항상 동의 화면을 표시
        }
      }
    })
  ],
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 24  // 1일
  },
  callbacks: {
    async signIn({ account, profile }) {
      if (account?.provider === 'google') {
        // 여기서 백엔드에 사용자 존재 여부 확인
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`, {
          method: 'POST',
          body: JSON.stringify({ 
            googleToken: account.access_token,
            email: profile?.email
          })
        });

        if(!response.ok) {
          return false;
        }

        const data = await response.json();

        if(data.isNewUser) {
          return '/selectDev';
        }
        
        // account.backendToken = data.token; //backend에서 발급한 JWT 저장
        return '/home';
      }
      return true
    },
    async jwt({ token, user }) {
      if (user?.accessToken) {
        token.accessToken = user.accessToken
      }
      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        session.accessToken = token.accessToken
      }
      return session
    }
  }
})