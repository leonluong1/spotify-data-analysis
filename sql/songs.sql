-- Exported from QuickDBD: https://www.quickdatabasediagrams.com/
-- NOTE! If you have used non-SQL datatypes in your design, you will have to change these here.
DROP TABLE IF EXISTS song;

CREATE TABLE "song" (
    "id" SERIAL   NOT NULL,
    "track_id" varchar(22)   NOT NULL,
    "track_name" varchar(179)   NOT NULL,
    "popularity" integer   NOT NULL,
    "available_markets" varchar(551)   NOT NULL,
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
    "principal_artist_followers" integer   NOT NULL,
    "acousticness" float   NOT NULL,
    "analysis_url" varchar(64)   NOT NULL,
    "danceability" float   NOT NULL,
    "energy" float   NOT NULL,
    "instrumentalness" float   NOT NULL,
    "key" integer   NOT NULL,
    "liveness" float   NOT NULL,
    "loudness" float   NOT NULL,
    "mode" integer   NOT NULL,
    "speechiness" float   NOT NULL,
    "tempo" float   NOT NULL,
    "time_signature" integer   NOT NULL,
    "valence" float   NOT NULL,
    "year" integer   NOT NULL,
    "duration_min" float   NOT NULL,
    CONSTRAINT "pk_Song" PRIMARY KEY (
        "id"
     )
);

