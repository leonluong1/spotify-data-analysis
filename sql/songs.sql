-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.
DROP TABLE IF EXISTS song;

CREATE TABLE "song" (
    "id" SERIAL   NOT NULL,
    "track_id" varchar(22)   NOT NULL,
    "track_name" varchar(179)   NOT NULL,
    "popularity" integer   NOT NULL,
    "disc_number" integer   NOT NULL,
    "duration_ms" integer   NOT NULL,
    "explicit" boolean   NOT NULL,
    "track_number" integer   NOT NULL,
    "album_id" varchar(22)   NOT NULL,
    "album_name" varchar(110)   NOT NULL,
    "album_release_date" DATE   NOT NULL,
    "album_type" varchar(11)   NOT NULL,
    "album_total_tracks" integer   NOT NULL,
    "artists_names" varchar(540)   NOT NULL,
    "artists_ids" varchar(919)   NOT NULL,
    "principal_artist_id" varchar(22)   NOT NULL,
    "principal_artist_name" varchar(51)   NOT NULL,
    "artist_genres" varchar(208),
    "principal_artist_followers" integer,
    "acousticness" float,
    "danceability" float,
    "energy" float,
    "instrumentalness" float,
    "key" integer,
    "liveness" float,
    "loudness" float,
    "mode" integer,
    "speechiness" float,
    "tempo" float,
    "time_signature" integer,
    "valence" float,
    "year" integer   NOT NULL,
    "duration_min" float   NOT NULL,
    CONSTRAINT "pk_Song" PRIMARY KEY (
        "id"
     )
);

select * from song;
