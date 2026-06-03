import { useEffect, useState } from "react";
import UserProfile from "../http/interfaces/userProfile";

export function userAuthUser() {
    
//usuario
  const [user, setUser] = useState<UserProfile | null>( () => {

    const stored = localStorage.getItem('@CazengoEduca:user');

    if(stored) {
      try {
            return JSON.parse(stored) as UserProfile;
      } catch (error) {
        return null;
      }
    }

    return null;
  });
  
 return { user, setUser};

}