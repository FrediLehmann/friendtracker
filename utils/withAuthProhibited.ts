import {
  GetServerSideProps,
  GetServerSidePropsContext,
} from 'next';
import { COOKIE_OPTIONS } from '@supabase/supabase-auth-helpers/shared/utils/constants'
import { CookieOptions } from '@supabase/supabase-auth-helpers/nextjs/types'

export function withAuthProhibited(arg?: { getServerSideProps?: GetServerSideProps, redirectTo?: string, cookieOptions?: CookieOptions }) {
  let {
    getServerSideProps = undefined,
    redirectTo = '/profile',
    cookieOptions = {}
  } = arg ? arg : {};
  return async (context: GetServerSidePropsContext) => {
    let ret: any = { props: {} };
    if (getServerSideProps) {
      try {
        ret = await getServerSideProps(context);
      } catch (e) {
        throw e
      }
    }

    if (!context.req.cookies) {
      return {
        ...ret,
        props: { ...ret.props }
      };
    }

    cookieOptions = { ...COOKIE_OPTIONS, ...cookieOptions };
    const access_token = context.req.cookies[`${cookieOptions.name}-access-token`];
    if (!access_token) {
      return {
        ...ret,
        props: { ...ret.props }
      };
    }

    return {
      redirect: {
        destination: redirectTo,
        permanent: false
      }
    };
  };
}