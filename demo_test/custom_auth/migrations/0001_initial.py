# Generated by Django 5.2 on 2025-04-26 10:12

import demo_test.custom_auth.managers
import django.utils.timezone
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ("auth", "0012_alter_user_first_name_max_length"),
    ]

    operations = [
        migrations.CreateModel(
            name="ApplicationUser",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("password", models.CharField(max_length=128, verbose_name="password")),
                (
                    "last_login",
                    models.DateTimeField(
                        blank=True, null=True, verbose_name="last login"
                    ),
                ),
                (
                    "is_superuser",
                    models.BooleanField(
                        default=False,
                        help_text="Designates that this user has all permissions without explicitly assigning them.",
                        verbose_name="superuser status",
                    ),
                ),
                (
                    "uuid",
                    models.UUIDField(
                        default=uuid.uuid4,
                        error_messages={
                            "unique": "A user with that uuid already exists."
                        },
                        help_text="Required. A 32 hexadecimal digits number as specified in RFC 4122.",
                        unique=True,
                        verbose_name="uuid",
                    ),
                ),
                (
                    "username",
                    models.CharField(
                        blank=True,
                        error_messages={
                            "unique": "A user with that username already exists."
                        },
                        help_text="Required. A 32 hexadecimal digits number as specified in RFC 4122.",
                        max_length=150,
                        null=True,
                        unique=True,
                        verbose_name="username",
                    ),
                ),
                (
                    "email",
                    models.EmailField(
                        blank=True,
                        error_messages={
                            "unique": "A user with that email already exists."
                        },
                        max_length=254,
                        null=True,
                        unique=True,
                        verbose_name="email address",
                    ),
                ),
                (
                    "is_email_verified",
                    models.BooleanField(default=True, verbose_name="email verified"),
                ),
                (
                    "first_name",
                    models.CharField(
                        blank=True, max_length=150, verbose_name="first name"
                    ),
                ),
                (
                    "last_name",
                    models.CharField(
                        blank=True, max_length=150, verbose_name="last name"
                    ),
                ),
                (
                    "full_name",
                    models.CharField(
                        blank=True,
                        help_text="Full name as it was returned by social provider",
                        max_length=150,
                        verbose_name="full name",
                    ),
                ),
                (
                    "about",
                    models.TextField(
                        blank=True, max_length=1000, verbose_name="about me"
                    ),
                ),
                (
                    "is_active",
                    models.BooleanField(
                        default=True,
                        help_text="Designates whether the user can log into this admin site.",
                        verbose_name="active",
                    ),
                ),
                (
                    "is_staff",
                    models.BooleanField(
                        default=False,
                        help_text="Designates whether this user should be treated as active. Unselect theis instead of deleting accounts.",
                        verbose_name="staff status",
                    ),
                ),
                (
                    "is_delete",
                    models.BooleanField(default=False, verbose_name="delete"),
                ),
                (
                    "date_joined",
                    models.DateTimeField(
                        default=django.utils.timezone.now, verbose_name="date joined"
                    ),
                ),
                (
                    "last_modified",
                    models.DateTimeField(auto_now=True, verbose_name="last modified"),
                ),
                (
                    "last_user_activity",
                    models.DateTimeField(
                        default=django.utils.timezone.now, verbose_name="last activity"
                    ),
                ),
                (
                    "date_of_birth",
                    models.DateField(
                        blank=True, null=True, verbose_name="data of birth"
                    ),
                ),
                (
                    "groups",
                    models.ManyToManyField(
                        blank=True,
                        help_text="The groups this user belongs to. A user will get all permissions granted to each of their groups.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.group",
                        verbose_name="groups",
                    ),
                ),
                (
                    "user_permissions",
                    models.ManyToManyField(
                        blank=True,
                        help_text="Specific permissions for this user.",
                        related_name="user_set",
                        related_query_name="user",
                        to="auth.permission",
                        verbose_name="user permissions",
                    ),
                ),
            ],
            options={
                "verbose_name": "User",
                "verbose_name_plural": "Users",
            },
            managers=[
                ("objects", demo_test.custom_auth.managers.ApplicationUserManager()),
            ],
        ),
    ]
