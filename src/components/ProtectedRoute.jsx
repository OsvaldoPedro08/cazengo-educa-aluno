import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute({ allowedRoles }) {

    // State para o Toast
    const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

    const userRaw = localStorage.getItem('@CazengoEduca:user'); //busca o usuario logado

    // Função para disparar o Toast
    const showToast = (message, type = 'success') => {
    
        setToast({ show: true, message, type });
    
        setTimeout(() => setToast({ show: false, message: '', type: 'warning' }), 4000);
    };

    //se a rota exigir tipo de usuario específicos
    if(allowedRoles) {
        
        if(!userRaw) {
            //Se tem token, mas o usuario ainda esta sendo gravado, mostra um estado de carregamento
            return <div className='flex h-screen items-center justify-center'>A carregar perfil...</div>;
        }
       
        try {
                const user = JSON.parse(userRaw);

                //se o tipo de usuario não estiver na lista de permissoes da rota, bloqueia
                if(!allowedRoles.includes(user.type_user)) {
                    
                    showToast("Você precisa iniciar sessão para partilhar recursos!", "warning");

                    setTimeout(() => <Navigate to="/" replace />, 1000);
                    
                    
                }
        } catch (error) {
            return <Navigate to="/" replace />;
        }
    }
}