import { database } from '../firebaseDBConfig';
import { child, get, ref, set } from "firebase/database";

export const addUserResolvedProblemsToDB = async (roadmapTitleId: number, resolvedProblems: any) => {

    try {
        const resolvedProblemsRef = ref(database, 'user/roadmapTitleId-' + roadmapTitleId); // Passa a instância do banco de dados
        await set(resolvedProblemsRef, resolvedProblems)
        return 'User info added successfully!';

    } catch (error) {
        console.error('Error User info to DB: ', error);
        return error
    }
};

export const getDataFromDB = (route: string) => {

    const fetchDataFromDB = async () => {
      const dbRef = ref(database);
      const snapshot = await get(child(dbRef, route));
      if(snapshot.exists()) {
          return snapshot.val();
      }
      else {
        return null;
      }
    }
    return fetchDataFromDB();

  }
  