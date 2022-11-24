export function allDataProyect(dates: any) {
    const data = dates[0]
    let proyect = {
        id: data?.id || "",
        country: data?.country || "",
        city: data?.city || "",
        type: data?.type || "",
        name: data?.name || "",
        token_price: data?.token_price || "",
        address: data?.address || "",
        tokens_emitted: data?.tokens_emitted || "",
        building_price: data?.building_price || "",
        tokens_available: data?.tokens_available || "",
        pic_1: data?.pic_1 || "",
        pic_2: data?.pic_2 || "",
        pic_3: data?.pic_3 || "",
        pic_4: data?.pic_4 || "",
        pic_5: data?.pic_5 || "",
        status: data?.status || "",
        address_id: data?.address_id || "",
        surface_building: data?.surface_building || "",
        number_departaments: data?.number_departaments || "",
        number_amenities: data?.number_amenities || "",
        escrow: data?.escrow || "",
        approved_plans: data?.approved_plans || "",
        construction_license: data?.construction_license || "",
        builder_data: data?.builder_data || "",
        zone_malls: data?.zone_malls || "",
        zone_markets: data?.zone_markets || "",
        zone_parks: data?.zone_par || "",
        zone_subway: data?.zone_sub || "",
        annual_rental: data?.annual || "",
        construction_interest: data?.construction_interest || "",
        annual_expenditure: data?.annual_expenditure || "",
        net_leasing: data?.net_leasing || "",
        annual_net_profit: data?.annual_net_profit || "",
        plusvalia: data?.plusvalia || "",
        create: data?.create || "",
        update: data?.update || "",
    }


    return proyect
}