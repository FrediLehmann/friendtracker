-- This script was generated by the Schema Diff utility in pgAdmin 4
-- For the circular dependencies, the order in which Schema Diff writes the objects is not very sophisticated
-- and may require manual changes to the script to ensure changes are applied in the correct order.
-- Please report an issue for any failure with the reproduction steps.

-- DROP FUNCTION IF EXISTS graphql.build_insert(ast jsonb, variable_definitions jsonb, variables jsonb, parent_type text);

-- DROP FUNCTION IF EXISTS graphql.build_update(ast jsonb, variable_definitions jsonb, variables jsonb, parent_type text, parent_block_name text);

-- DROP FUNCTION IF EXISTS graphql.build_delete(ast jsonb, variable_definitions jsonb, variables jsonb, parent_type text, parent_block_name text);

-- DROP FUNCTION IF EXISTS graphql.cache_key(role regrole, ast jsonb, variables jsonb);

-- DROP TABLE IF EXISTS graphql._type CASCADE;

-- DROP TABLE IF EXISTS graphql._field CASCADE;

CREATE OR REPLACE FUNCTION public.are_pending_friends(
	target text)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    SET search_path=public
AS $BODY$
DECLARE
  requestor text;
BEGIN
  IF auth.role() != 'authenticated'
  THEN
    RAISE EXCEPTION 'Unauthenticated';
  END IF;

  SELECT profile_hash
  INTO requestor
  FROM profiles
  WHERE owner = auth.uid();

  RETURN (
    SELECT count(id)
    FROM friends
    WHERE request_status = 'pending'
    AND initiator = requestor
    OR friend = requestor
  ) > 0;
END;
$BODY$;

ALTER FUNCTION public.are_pending_friends(text)
    OWNER TO supabase_admin;

GRANT EXECUTE ON FUNCTION public.are_pending_friends(text) TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.are_pending_friends(text) TO anon;

GRANT EXECUTE ON FUNCTION public.are_pending_friends(text) TO authenticated;

GRANT EXECUTE ON FUNCTION public.are_pending_friends(text) TO postgres;

GRANT EXECUTE ON FUNCTION public.are_pending_friends(text) TO service_role;

GRANT EXECUTE ON FUNCTION public.are_pending_friends(text) TO supabase_admin;

CREATE OR REPLACE FUNCTION public.deny_friend_request(
	request_id integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    SET search_path=public
AS $BODY$
DECLARE
  requestor text;
BEGIN
  IF auth.role() != 'authenticated'
  THEN
    RAISE EXCEPTION 'Unauthenticated';
  END IF;

  SELECT profile_hash
  INTO requestor
  FROM profiles
  WHERE owner = auth.uid();

  UPDATE friends
  SET request_status = 'denied'
  WHERE id = request_id
  AND request_status = 'pending'
  AND  friend = requestor;
END;
$BODY$;

ALTER FUNCTION public.deny_friend_request(integer)
    OWNER TO supabase_admin;

GRANT EXECUTE ON FUNCTION public.deny_friend_request(integer) TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.deny_friend_request(integer) TO anon;

GRANT EXECUTE ON FUNCTION public.deny_friend_request(integer) TO authenticated;

GRANT EXECUTE ON FUNCTION public.deny_friend_request(integer) TO postgres;

GRANT EXECUTE ON FUNCTION public.deny_friend_request(integer) TO service_role;

GRANT EXECUTE ON FUNCTION public.deny_friend_request(integer) TO supabase_admin;

CREATE OR REPLACE FUNCTION public.get_users(
	query text)
    RETURNS TABLE(name text, avatar text, hash text) 
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    ROWS 1000

    SET search_path=public
AS $BODY$
BEGIN
  IF auth.role() != 'authenticated'
  THEN
    RAISE EXCEPTION 'Unauthenticated';
  END IF;

  RETURN QUERY
  SELECT user_name, avatar_url, profile_hash
  FROM profiles
  WHERE owner != auth.uid()
  AND NOT are_friends(profile_hash)
  AND NOT are_pending_friends(profile_hash)
  AND to_tsvector(public.profiles.user_name) @@ to_tsquery(query);
END;
$BODY$;

ALTER FUNCTION public.get_users(text)
    OWNER TO supabase_admin;

GRANT EXECUTE ON FUNCTION public.get_users(text) TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.get_users(text) TO anon;

GRANT EXECUTE ON FUNCTION public.get_users(text) TO authenticated;

GRANT EXECUTE ON FUNCTION public.get_users(text) TO postgres;

GRANT EXECUTE ON FUNCTION public.get_users(text) TO service_role;

GRANT EXECUTE ON FUNCTION public.get_users(text) TO supabase_admin;

CREATE OR REPLACE FUNCTION public.approve_friend_request(
	request_id integer)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    SET search_path=public
AS $BODY$
DECLARE
  requestor text;
BEGIN
  IF auth.role() != 'authenticated'
  THEN
    RAISE EXCEPTION 'Unauthenticated';
  END IF;

  SELECT profile_hash
  INTO requestor
  FROM profiles
  WHERE owner = auth.uid();

  UPDATE friends
  SET request_status = 'accepted'
  WHERE id = request_id
  AND request_status = 'pending'
  AND  friend = requestor;
END;
$BODY$;

ALTER FUNCTION public.approve_friend_request(integer)
    OWNER TO supabase_admin;

GRANT EXECUTE ON FUNCTION public.approve_friend_request(integer) TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.approve_friend_request(integer) TO anon;

GRANT EXECUTE ON FUNCTION public.approve_friend_request(integer) TO authenticated;

GRANT EXECUTE ON FUNCTION public.approve_friend_request(integer) TO postgres;

GRANT EXECUTE ON FUNCTION public.approve_friend_request(integer) TO service_role;

GRANT EXECUTE ON FUNCTION public.approve_friend_request(integer) TO supabase_admin;

CREATE OR REPLACE FUNCTION public.send_friend_request(
	sender text,
	receiver text)
    RETURNS void
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    SET search_path=public
AS $BODY$
BEGIN
  IF auth.role() != 'authenticated'
  THEN
    RAISE EXCEPTION 'Unauthenticated';
  END IF;

  IF sender = receiver
  THEN
    RAISE EXCEPTION 'Can''t send friend request to yourself';
  END IF;

  IF (SELECT count(id) FROM friends WHERE initiator = sender AND friend = receiver) > 0
  THEN
    RAISE EXCEPTION 'Already friends';
  END IF;

  IF (SELECT count(id) FROM friends WHERE initiator = receiver AND friend = sender) > 0
  THEN
    RAISE EXCEPTION 'Already got a request';
  END IF;

  INSERT INTO friends(initiator, friend, request_status)
  VALUES (sender, receiver, 'pending');
END;
$BODY$;

ALTER FUNCTION public.send_friend_request(text, text)
    OWNER TO supabase_admin;

GRANT EXECUTE ON FUNCTION public.send_friend_request(text, text) TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.send_friend_request(text, text) TO anon;

GRANT EXECUTE ON FUNCTION public.send_friend_request(text, text) TO authenticated;

GRANT EXECUTE ON FUNCTION public.send_friend_request(text, text) TO postgres;

GRANT EXECUTE ON FUNCTION public.send_friend_request(text, text) TO service_role;

GRANT EXECUTE ON FUNCTION public.send_friend_request(text, text) TO supabase_admin;

CREATE OR REPLACE FUNCTION public.are_friends(
	target text)
    RETURNS boolean
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE SECURITY DEFINER PARALLEL UNSAFE
    SET search_path=public
AS $BODY$
DECLARE
  requestor text;
BEGIN
  IF auth.role() != 'authenticated'
  THEN
    RAISE EXCEPTION 'Unauthenticated';
  END IF;

  SELECT profile_hash
  INTO requestor
  FROM profiles
  WHERE owner = auth.uid();

  RETURN (
    SELECT count(id)
    FROM friends
    WHERE request_status = 'accepted'
    AND (
      initiator = requestor
      OR friend = requestor
    )
    AND (
      initiator = target
      OR friend = target
    )
  ) > 0;
END;
$BODY$;

ALTER FUNCTION public.are_friends(text)
    OWNER TO supabase_admin;

GRANT EXECUTE ON FUNCTION public.are_friends(text) TO PUBLIC;

GRANT EXECUTE ON FUNCTION public.are_friends(text) TO anon;

GRANT EXECUTE ON FUNCTION public.are_friends(text) TO authenticated;

GRANT EXECUTE ON FUNCTION public.are_friends(text) TO postgres;

GRANT EXECUTE ON FUNCTION public.are_friends(text) TO service_role;

GRANT EXECUTE ON FUNCTION public.are_friends(text) TO supabase_admin;

CREATE OR REPLACE FUNCTION public.handle_new_user()
    RETURNS trigger
    LANGUAGE 'plpgsql'
    COST 100
    VOLATILE NOT LEAKPROOF SECURITY DEFINER
AS $BODY$
BEGIN
  INSERT INTO public.profiles (owner, profile_hash)
  VALUES (new.id, md5(random()::text));
  
  RETURN new;
END;
$BODY$;

ALTER FUNCTION public.handle_new_user()
    OWNER TO supabase_admin;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO anon;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO postgres;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO supabase_admin;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO authenticated;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

GRANT EXECUTE ON FUNCTION public.handle_new_user() TO PUBLIC;

CREATE TABLE IF NOT EXISTS public.emails
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created_at timestamp with time zone DEFAULT now(),
    owner uuid NOT NULL,
    email text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT emails_pkey PRIMARY KEY (id),
    CONSTRAINT emails_owner_fkey FOREIGN KEY (owner)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.emails
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.emails
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.emails TO anon;

GRANT ALL ON TABLE public.emails TO postgres;

GRANT ALL ON TABLE public.emails TO supabase_admin;

GRANT ALL ON TABLE public.emails TO authenticated;

GRANT ALL ON TABLE public.emails TO service_role;

COMMENT ON TABLE public.emails
    IS 'Users email addresses, used to identify or find friends';
CREATE POLICY "Authenticated, owner"
    ON public.emails
    AS PERMISSIVE
    FOR ALL
    TO authenticated
    USING ((auth.uid() = owner))
    WITH CHECK ((auth.uid() = owner));

CREATE TABLE IF NOT EXISTS public.phones
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created_at timestamp with time zone DEFAULT now(),
    phone text COLLATE pg_catalog."default",
    owner uuid,
    CONSTRAINT phones_pkey PRIMARY KEY (id),
    CONSTRAINT phones_owner_fkey FOREIGN KEY (owner)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.phones
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.phones
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.phones TO anon;

GRANT ALL ON TABLE public.phones TO postgres;

GRANT ALL ON TABLE public.phones TO supabase_admin;

GRANT ALL ON TABLE public.phones TO authenticated;

GRANT ALL ON TABLE public.phones TO service_role;

COMMENT ON TABLE public.phones
    IS 'Users phone numbers';
CREATE POLICY "Authenticated, owner"
    ON public.phones
    AS PERMISSIVE
    FOR ALL
    TO authenticated
    USING ((auth.uid() = owner))
    WITH CHECK ((auth.uid() = owner));

CREATE TABLE IF NOT EXISTS public.profiles
(
    created_at timestamp with time zone DEFAULT now(),
    owner uuid NOT NULL,
    user_name text COLLATE pg_catalog."default",
    avatar_url text COLLATE pg_catalog."default",
    profile_hash text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT profile_pkey PRIMARY KEY (owner),
    CONSTRAINT profiles_profile_hash_key UNIQUE (profile_hash),
    CONSTRAINT profile_owner_fkey FOREIGN KEY (owner)
        REFERENCES auth.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.profiles
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.profiles
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.profiles TO supabase_admin;

GRANT ALL ON TABLE public.profiles TO authenticated;

GRANT ALL ON TABLE public.profiles TO anon;

GRANT ALL ON TABLE public.profiles TO postgres;

GRANT ALL ON TABLE public.profiles TO service_role;

COMMENT ON TABLE public.profiles
    IS 'User profile';

COMMENT ON COLUMN public.profiles.user_name
    IS 'User name';

COMMENT ON COLUMN public.profiles.avatar_url
    IS 'Avatar image url';
CREATE POLICY "Authenticated, owner select"
    ON public.profiles
    AS PERMISSIVE
    FOR SELECT
    TO authenticated
    USING ((auth.uid() = owner));
CREATE POLICY "Authenticated, owner update"
    ON public.profiles
    AS PERMISSIVE
    FOR UPDATE
    TO authenticated
    USING ((auth.uid() = owner))
    WITH CHECK ((auth.uid() = owner));
CREATE POLICY "Select Friends"
    ON public.profiles
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING ((are_friends(profile_hash) OR are_pending_friends(profile_hash)));

-- Type: friend_request_status

-- DROP TYPE IF EXISTS public.friend_request_status;

CREATE TYPE public.friend_request_status AS ENUM
    ('pending', 'accepted', 'denied', 'revoked');

ALTER TYPE public.friend_request_status
    OWNER TO supabase_admin;

CREATE TABLE IF NOT EXISTS public.friends
(
    id bigint NOT NULL GENERATED BY DEFAULT AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now(),
    initiator text COLLATE pg_catalog."default",
    friend text COLLATE pg_catalog."default",
    request_status friend_request_status,
    CONSTRAINT friends_pkey PRIMARY KEY (id),
    CONSTRAINT friends_friend_fkey FOREIGN KEY (friend)
        REFERENCES public.profiles (profile_hash) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT friends_initiator_fkey FOREIGN KEY (initiator)
        REFERENCES public.profiles (profile_hash) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.friends
    OWNER to supabase_admin;

ALTER TABLE IF EXISTS public.friends
    ENABLE ROW LEVEL SECURITY;

GRANT ALL ON TABLE public.friends TO supabase_admin;

GRANT ALL ON TABLE public.friends TO authenticated;

GRANT ALL ON TABLE public.friends TO anon;

GRANT ALL ON TABLE public.friends TO postgres;

GRANT ALL ON TABLE public.friends TO service_role;
CREATE POLICY "Owner Select"
    ON public.friends
    AS PERMISSIVE
    FOR SELECT
    TO public
    USING (((initiator = ( SELECT profiles.profile_hash
   FROM profiles
  WHERE (profiles.owner = auth.uid()))) OR (friend = ( SELECT profiles.profile_hash
   FROM profiles
  WHERE (profiles.owner = auth.uid())))));