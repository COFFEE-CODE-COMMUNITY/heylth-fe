/*
  # Create Heylth Application Tables

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `username` (text, unique, not null)
      - `name` (text)
      - `avatar_url` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `daily_health_data`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `date` (date, not null)
      - `sleep_start` (text)
      - `sleep_start_period` (text) - AM/PM
      - `sleep_end` (text)
      - `sleep_end_period` (text) - AM/PM
      - `sleep_hours` (numeric)
      - `meals` (text array) - breakfast, lunch, dinner
      - `screen_time_hours` (numeric)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `journals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `mood` (text, not null) - very_happy, happy, neutral, sad, angry
      - `title` (text, not null)
      - `description` (text)
      - `date` (date, not null)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `reminders`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `date` (date, not null)
      - `sleep_status` (text) - good, bad
      - `sleep_message` (text)
      - `meals_status` (text) - good, bad
      - `meals_message` (text)
      - `screen_time_status` (text) - good, bad
      - `screen_time_message` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  username text UNIQUE NOT NULL,
  name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create daily_health_data table
CREATE TABLE IF NOT EXISTS daily_health_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL DEFAULT CURRENT_DATE,
  sleep_start text,
  sleep_start_period text,
  sleep_end text,
  sleep_end_period text,
  sleep_hours numeric,
  meals text[] DEFAULT '{}',
  screen_time_hours numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

ALTER TABLE daily_health_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own health data"
  ON daily_health_data FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own health data"
  ON daily_health_data FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own health data"
  ON daily_health_data FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own health data"
  ON daily_health_data FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create journals table
CREATE TABLE IF NOT EXISTS journals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  mood text NOT NULL,
  title text NOT NULL,
  description text,
  date date NOT NULL DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE journals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own journals"
  ON journals FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own journals"
  ON journals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own journals"
  ON journals FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own journals"
  ON journals FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create reminders table
CREATE TABLE IF NOT EXISTS reminders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  date date NOT NULL,
  sleep_status text DEFAULT 'good',
  sleep_message text,
  meals_status text DEFAULT 'good',
  meals_message text,
  screen_time_status text DEFAULT 'good',
  screen_time_message text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, date)
);

ALTER TABLE reminders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reminders"
  ON reminders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reminders"
  ON reminders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reminders"
  ON reminders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own reminders"
  ON reminders FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);