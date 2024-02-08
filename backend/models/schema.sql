-- Table: Roles
CREATE TABLE Roles (
    id SERIAL NOT NULL,
    role VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Table: Permissions
CREATE TABLE Permissions (
    id SERIAL NOT NULL,
    permission VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

-- Table: role_permission 
CREATE TABLE role_permission (
    id SERIAL NOT NULL,
    role_id INT,
    permission_id INT,
    FOREIGN KEY (role_id) REFERENCES Roles (id),
    FOREIGN KEY (permission_id) REFERENCES Permissions (id),
    PRIMARY KEY (id)
);

-- Table: Users
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(100) NOT NULL,
    bio TEXT,
    profile_picture_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    role_id INT,
    is_deleted INT,
    FOREIGN KEY (role_id) REFERENCES Roles (id)
);

-- Table: Posts
CREATE TABLE Posts (
    id SERIAL PRIMARY KEY,
    user_id INT,
    content TEXT NOT NULL,
    media_url TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    is_deleted SMALLINT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES Users (id)
);

-- Table: Comments
CREATE TABLE Comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INT,
    post_id INT,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    is_deleted INT,
    FOREIGN KEY (user_id) REFERENCES Users (id),
    FOREIGN KEY (post_id) REFERENCES Posts (id)
);

-- Table: Likes
CREATE TABLE Likes (
    like_id SERIAL PRIMARY KEY,
    user_id INT,
    post_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (id),
    FOREIGN KEY (post_id) REFERENCES Posts (id)
);

-- Table: Follows (Many-to-Many)
CREATE TABLE Follows (
    follow_id SERIAL PRIMARY KEY,
    follower_id INT,
    followed_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (follower_id) REFERENCES Users (id),
    FOREIGN KEY (followed_id) REFERENCES Users (id)
);

-- Table: Notifications
CREATE TABLE Notifications (
    notification_id SERIAL PRIMARY KEY,
    user_id INT,
    content TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users (id)
);

-- Table: Stories
CREATE TABLE Stories (
    id SERIAL PRIMARY KEY,
    user_id = INT,
    content TEXT NOT NULL,
    media_url TEXT,
    video_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted INT,
    FOREIGN KEY (user_id) REFERENCES Users (id)
);

-- Table: Reels
CREATE TABLE Reels (
    id SERIAL PRIMARY KEY,
    user_id INT,
    reel_title VARCHAR(100) NOT NULL,
    description TEXT,
    video_url TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_deleted INT,
    FOREIGN KEY (user_id) REFERENCES Users (id)
);


-- register
INSERT INTO
    Users (
        username,
        email,
        password_hash,
        bio,
        profile_picture_url,
        role_id,
        is_deleted
    )
VALUES
    ($ 1, $ 2, $ 3, $ 4, $ 5, $ 6, $ 7) RETURNING *
    
    
    
     -- Inserting a new notification
INSERT INTO
    Notifications (user_id, content)
VALUES
    (123, 'Someone liked your post.');

-- Retrieving unread notifications for a user
SELECT
    *
FROM
    Notifications
WHERE
    user_id = 123
    AND is_read = FALSE;

-- Marking notifications as read
UPDATE
    Notifications
SET
    is_read = TRUE
WHERE
    user_id = 123;