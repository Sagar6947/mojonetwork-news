-- CreateTable
CREATE TABLE `tbl_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `create_date` DATETIME(3) NOT NULL,
    `update_date` DATETIME(3) NULL,
    `name` VARCHAR(200) NULL,
    `email_id` VARCHAR(200) NULL,
    `contact_no` VARCHAR(200) NULL,
    `user_type` ENUM('REPORTER', 'SUBREPORTER') NOT NULL DEFAULT 'REPORTER',
    `portal_user_id` INTEGER NOT NULL,
    `user_role_id` INTEGER NOT NULL,
    `status` ENUM('UNBLOCKED', 'BLOCKED') NOT NULL DEFAULT 'UNBLOCKED',
    `is_user_otp` ENUM('DISABLE', 'ENABLE') NOT NULL DEFAULT 'ENABLE',

    UNIQUE INDEX `tbl_users_email_id_key`(`email_id`),
    UNIQUE INDEX `tbl_users_contact_no_key`(`contact_no`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
