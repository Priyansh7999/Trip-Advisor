# PostgreSQL Database Schema for City Information

This README provides an overview of the PostgreSQL database schema used to store detailed information about cities, including their geographical details, history, seasons, accessibility, attractions, and local experiences. The schema has been normalized into relational tables with foreign keys to maintain integrity and improve query flexibility.

## Schema Overview

### Tables:

1. **City**
2. **History**
3. **Seasons**
4. **GeographicalDetails**
5. **TripDetails**
6. **Accessibility**
7. **Attractions**
8. **LocalEvents**
9. **Experiences**
10. **FoodToTryInPlacesToVisit**

### Relationships:

- The `City` table contains the main city information and is referenced by other tables using foreign keys.
- The `History`, `Seasons`, `GeographicalDetails`, `TripDetails`, `Accessibility`, `Attractions`, `LocalEvents`, and `Experiences` tables are linked to `City` by `CityID`.
- The `FoodToTryInPlacesToVisit` table is linked to `Experiences` by `ExperienceID`.

## SQL Schema Design

```sql
-- City Table
CREATE TABLE City (
    CityID SERIAL PRIMARY KEY,  -- Auto-incremented ID for each city
    CityName VARCHAR(255) NOT NULL,
    CityState VARCHAR(255) NOT NULL,
    CityTitle VARCHAR(255) NOT NULL,
    CityBriefDesc TEXT NOT NULL,
    CityDetailedDesc TEXT NOT NULL,
    CityCategory VARCHAR(255) NOT NULL
);

-- History Table
CREATE TABLE History (
    HistoryID SERIAL PRIMARY KEY,
    CityID INT REFERENCES City(CityID) ON DELETE CASCADE,  -- Foreign Key to City
    History TEXT,
    EstablishedYear INT
);

-- Seasons Table
CREATE TABLE Seasons (
    SeasonID SERIAL PRIMARY KEY,
    CityID INT REFERENCES City(CityID) ON DELETE CASCADE,  -- Foreign Key to City
    PeakSeasonFrom DATE,
    PeakSeasonTo DATE,
    PeakSeasonWhatToExpect TEXT,
    PeakSeasonThingsYoullLove TEXT,
    ModerateSeasonFrom DATE,
    ModerateSeasonTo DATE,
    ModerateSeasonWhatToExpect TEXT,
    ModerateSeasonThingsYoullLove TEXT,
    OffSeasonFrom DATE,
    OffSeasonTo DATE,
    OffSeasonWhatToExpect TEXT,
    OffSeasonThingsYoullLove TEXT
);

-- GeographicalDetails Table
CREATE TABLE GeographicalDetails (
    GeoID SERIAL PRIMARY KEY,
    CityID INT REFERENCES City(CityID) ON DELETE CASCADE,  -- Foreign Key to City
    Region VARCHAR(255) NOT NULL,
    Latitude FLOAT NOT NULL,
    Longitude FLOAT NOT NULL,
    Location GEOGRAPHY(POINT, 4326)  -- GeoJSON-style Point for location (PostgreSQL's geography type)
);

-- TripDetails Table
CREATE TABLE TripDetails (
    TripID SERIAL PRIMARY KEY,
    CityID INT REFERENCES City(CityID) ON DELETE CASCADE,  -- Foreign Key to City
    AverageTripLength INT,  -- in days
    BestTimeToVisitCity TEXT,
    WhenToVisitCity TEXT
);

-- Accessibility Table
CREATE TABLE Accessibility (
    AccessID SERIAL PRIMARY KEY,
    CityID INT REFERENCES City(CityID) ON DELETE CASCADE,  -- Foreign Key to City
    ByAir TEXT NOT NULL,
    ByRail TEXT NOT NULL,
    ByRoad TEXT NOT NULL
);

-- Attractions Table
CREATE TABLE Attractions (
    AttractionID SERIAL PRIMARY KEY,
    CityID INT REFERENCES City(CityID) ON DELETE CASCADE,  -- Foreign Key to City
    ImgUrl TEXT,
    Name VARCHAR(255) NOT NULL,
    Description TEXT NOT NULL
);

-- LocalEvents Table
CREATE TABLE LocalEvents (
    EventID SERIAL PRIMARY KEY,
    CityID INT REFERENCES City(CityID) ON DELETE CASCADE,  -- Foreign Key to City
    FestivalName VARCHAR(255),
    Description TEXT
);

-- Experiences Table
CREATE TABLE Experiences (
    ExperienceID SERIAL PRIMARY KEY,
    CityID INT REFERENCES City(CityID) ON DELETE CASCADE,  -- Foreign Key to City
    ThingsToSeeAndDo TEXT NOT NULL
);

-- FoodToTryInPlacesToVisit Table
CREATE TABLE FoodToTryInPlacesToVisit (
    FoodID SERIAL PRIMARY KEY,
    ExperienceID INT REFERENCES Experiences(ExperienceID) ON DELETE CASCADE,  -- Foreign Key to Experiences
    ImgUrl TEXT NOT NULL,
    FoodName VARCHAR(255) NOT NULL,
    FoodDesc TEXT NOT NULL
);
```

## Explanation of Tables

### 1. City

- **Description**: Contains the main information about the city such as its name, state, category, brief and detailed descriptions.
- **Primary Key**: `CityID`

### 2. History

- **Description**: Stores the history and establishment year of the city.
- **Foreign Key**: `CityID` (references the `City` table)

### 3. Seasons

- **Description**: Contains information about different seasons (peak, moderate, and off-season), including expected weather and activities for each season.
- **Foreign Key**: `CityID` (references the `City` table)

### 4. GeographicalDetails

- **Description**: Stores the region, latitude, longitude, and location (as a geographical point).
- **Foreign Key**: `CityID` (references the `City` table)
- **GeoJSON Location**: Uses PostgreSQL’s geography type for location.

### 5. TripDetails

- **Description**: Stores trip-related data such as the average trip length, best time to visit, and additional timing recommendations.
- **Foreign Key**: `CityID` (references the `City` table)

### 6. Accessibility

- **Description**: Contains information on how to reach the city (by air, rail, or road).
- **Foreign Key**: `CityID` (references the `City` table)

### 7. Attractions

- **Description**: Contains information on famous city attractions, including their name, description, and image URL.
- **Foreign Key**: `CityID` (references the `City` table)

### 8. LocalEvents

- **Description**: Stores details about local festivals and events in the city.
- **Foreign Key**: `CityID` (references the `City` table)

### 9. Experiences

- **Description**: Stores activities and things to do in the city.
- **Foreign Key**: `CityID` (references the `City` table)

### 10. FoodToTryInPlacesToVisit

- **Description**: Stores food specialties related to specific experiences in the city.
- **Foreign Key**: `ExperienceID` (references the `Experiences` table)

## Indexing and Performance

To optimize the performance of queries, especially for frequently searched fields like city name or geographical data, consider adding indexes:

```sql
-- Create an index on CityName
CREATE INDEX idx_city_name ON City (CityName);

-- Create an index on GeographicalDetails (Latitude and Longitude)
CREATE INDEX idx_geo_location ON GeographicalDetails USING GIST (Location);
```
