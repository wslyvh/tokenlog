import axios from 'axios';
import { OrgRepo } from 'types/Repository';

export default {
    GetRepositories
  };

  async function GetRepositories(): Promise<Array<OrgRepo>> {
    try {
      const result = await axios.get(`/.netlify/functions/repos`);
      if (result.status !== 200) throw new Error("Couldn't get repositories");

      return result.data;
    } catch {
      console.error("Couldn't get repositories");
    }

    return [];
  }
