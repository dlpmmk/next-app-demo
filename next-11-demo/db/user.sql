-- 删除用户表
DROP TABLE IF EXISTS "user";
-- 创建用户表
CREATE TABLE "public"."user" (
	"userid" text,
	"name" text,
	"sex" smallint,
	"password" text,
	"phone" text,
	"email" text,
	"avatar" text,
	"state" smallint,
	"update_name" text,
	"update_time" bigint,
	PRIMARY KEY (userid)
) WITH (oids = false);
-- 用户表字段说明
COMMENT ON TABLE "public"."user" IS '用户表';

COMMENT ON COLUMN "public"."user"."userid" IS '用户名';

COMMENT ON COLUMN "public"."user"."name" IS '姓名';

COMMENT ON COLUMN "public"."user"."password" IS '密码';

COMMENT ON COLUMN "public"."user"."phone" IS '手机号';

COMMENT ON COLUMN "public"."user"."email" IS '邮箱';

COMMENT ON COLUMN "public"."user"."avatar" IS '用户头像';

COMMENT ON COLUMN "public"."user"."state" IS '逻辑删除标识：0 删除 1 在用';

COMMENT ON COLUMN "public"."user"."sex" IS '性别：0 女 1 男';

COMMENT ON COLUMN "public"."user"."update_name" IS '更新人姓名';

COMMENT ON COLUMN "public"."user"."update_time" IS '更新时间';
-- 用户表基础数据
INSERT INTO
"user" ("userid","name","sex","password","phone","email","avatar","state","update_name","update_time")
VALUES
('admin','管理员',1,'e10adc3949ba59abbe56e057f20f883e','8888666777','332818@qq.com','',1,'管理员',floor(extract(epoch from((current_timestamp - timestamp '1970-01-01 00:00:00') * 1000))));
