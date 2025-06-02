from typing import Optional

from backend.schemas.users import User
from backend.mongo_client import MongoMotorClient


class UserRepository:
    def __init__(self, db):
        self.client = MongoMotorClient(db, "users")

    async def create_user(self, user: User) -> Optional[User]:
        existing_user = await self.client.get_item({"email": user.email})
        if existing_user:
            raise Exception(f"User with email {user.email} already exists")

        await self.client.put_item(user.model_dump())
        return existing_user or user

    async def get_user(self, email: str) -> Optional[User]:
        item = await self.client.get_item({"email": email})
        return User.model_validate(item) if item else None

    async def update_user(self, email: str, update: dict) -> Optional[dict]:
        updated_item = await self.client.update_item({"email": email}, update)
        return updated_item

    async def delete_user(self, email: str) -> None:
        await self.client.delete_item({"email": email})
