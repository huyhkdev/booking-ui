import { Province } from "../hooks/province/useProvince"

export const mapProvinceCodename = (provinces: Province[]) => {
  return provinces.reduce((acc, province) => {
    acc[province.codename] = province.name
    return acc
  }, {} as Record<string, string>)
}

export const getLocationByCodeName = (
  codename: string,
  provinceMap: Record<string, string>
): string => {
  return provinceMap[codename] || codename
}
