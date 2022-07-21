

export function setUserModel(data?: any) {
      let mydata = {
            user: {

                  "uid": data?.uid,
                  "email": data?.email,
                  "nombre": data?.nombre || "",
                  "apellido": data?.apellido || "",
                  "nacionalidad": data?.nacionalidad || "",
                  "fecha_nacimiento": data?.fecha_nacimiento || "",
                  "identificacion": data?.identificacion || "",
                  "ciudad": data?.ciudad || "",
                  "postal": data?.postal || "",
                  "direccion": data?.direccion || ""

            },
            token: data?.token,
            message: data?.message || ""
      }


      return mydata;
}
