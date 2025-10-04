import type { FilterFormProps } from "../../entities/modals/component/dropdown";
export default function FilterFormProps({
  // name,
  level1,
  level2,
  orderType,
  status,
  // setName,
  setLevel1,
  setLevel2,
  setOrderType,
  setStatus,
}:FilterFormProps){
    return (
    <>
      {/* Name */}
      {/* <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm bg-white"
          placeholder="Enter name"
        />
      </div> */}

      {/* Level 1 */}
      <div>
        <label className="block text-sm font-medium mb-1">Level 1</label>
        <select
          value={level1}
          onChange={(e) => setLevel1(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm bg-white"
        >
          <option value="">ALL</option>
          <option value="ACHCHI">ACHCHI</option>
          <option value="AHPREPAID">AHPREPAID PVT. LTD.</option>
        </select>
      </div>

      {/* Level 2 */}
      <div>
        <label className="block text-sm font-medium mb-1">Level 2</label>
        <select
          value={level2}
          onChange={(e) => setLevel2(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm bg-white"
        >
          <option value="">ALL</option>
          <option value="168">168 Cell Phone Repair</option>
          <option value="3D">3D Wireless LLC</option>
        </select>
      </div>

      {/* Order Type */}
      <div>
        <label className="block text-sm font-medium mb-1">Order Type</label>
        <select
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm bg-white"
        >
          <option value="">ALL</option>
          <option value="Activation">Activation</option>
          <option value="Recharge">Recharge</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="block text-sm font-medium mb-1">Status</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border rounded-md px-3 py-2 text-sm bg-white"
        >
          <option value="">ALL</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </>
  );
}
