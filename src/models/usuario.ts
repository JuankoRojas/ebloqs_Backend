

export function setUserModel(data?: any) {
      let mydata = {
            user: {

                  "uid": data?.uid,
                  "email": data?.email,
                  "nombre": data?.nombre || "",
                  "apellido": data?.apellido || "",
                  "nacionalidad": data?.phone || "",
                  "fecha_nacimiento": data?.fecha_nacimiento || "",
                  "identificacion": data?.identificacion || "",
                  "ciudad": data?.sector || "",
                  "postal": data?.postal || "",
                  "direccion": data?.direccion || ""

            },
            token: data?.token,
            message: data?.message || ""
      }


      return mydata;
}
