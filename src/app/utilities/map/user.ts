
import { User } from '@admin/shared/models/user';
import { QueryDocumentSnapshot } from '@angular/fire/firestore';

export const toUser = (doc: QueryDocumentSnapshot<User>): User => {
    const data: User = doc.data();
    const uid = doc.id;
    return {
        ...data,
        uid
    };
};
