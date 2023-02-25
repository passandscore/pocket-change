// import Icon from "react-crypto-icons";
import {
  Avatar,
  Badge,
  Table,
  Group,
  Text,
  Select,
  ScrollArea,
  Modal,
  Flex,
} from "@mantine/core";
import { BalanceDetails } from "@/data-schema/BalanceDetails";
import { EthIcon } from "@/crypto-icons/ethIcon";
import { useEnsAvatar } from "wagmi";

interface UsersTableProps {
  avatar: string;
  name: string;
  job: string;
  email: string;
  role: string;
}
[];

const icons = [EthIcon];
const results = [
  {
    avatar: "https://avatars.githubusercontent.com/u/70067?v=4",
    name: "Artem Sapegin",
    job: "Frontend Engineer",
    email: "",
    role: "Manager",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/70067?v=4",
    name: "Vadim Makeev",
    job: "Frontend Engineer",
    email: "",
    role: "Collaborator",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/11071?v=4",
    name: "Max Stoiber",
    job: "Frontend Engineer",
    email: "",
    role: "Contractor",
  },
  {
    avatar: "https://avatars.githubusercontent.com/u/20046?v=4",
    name: "Dan Abramov",
    job: "Frontend Engineer",
    email: "",
    role: "Manager",
  },
] as UsersTableProps[];

export const TokenModal = ({
  openTokenModal,
  setOpenTokenModal,
  balanceDetails,
  address,
  OnModalClose,
}: {
  openTokenModal: boolean;
  setOpenTokenModal: (open: boolean) => void;
  balanceDetails: BalanceDetails[];
  address: any;
  OnModalClose: () => void;
}) => {
  const { data } = useEnsAvatar({
    address: `0x${address?.slice(2)}`,
  });

  const rows = balanceDetails?.map((item, index) => (
    <tr key={`${item.network}-${index}`}>
      <td>
        <Text size="sm" weight={500}>
          {item.network}
        </Text>
      </td>

      <td>
        <Text size="sm" color="dimmed">
          {item?.tokenPrice?.usdPrice?.toLocaleString()}
        </Text>
      </td>

      <td>
        <Flex direction="column">
          <Text size="sm" color="dimmed">
            {`$${(
              item?.balance * item?.tokenPrice?.usdPrice
            ).toLocaleString()}`}
          </Text>
          <Text size="sm" color="dimmed">
            {`${item?.balance.toFixed(3)} ${
              item?.tokenPrice?.nativePrice?.symbol
            }`}
          </Text>
        </Flex>
      </td>
    </tr>
  ));

  return (
    <>
      <Modal
        opened={openTokenModal}
        onClose={OnModalClose}
        centered
        size="lg"
        style={{ borderColor: "white" }}
        overlayColor="rgba(0, 0, 0, 0.5)"
      >
        {/* Wallet Details */}
        <Flex justify="center" mb={20}>
          <Group position="center">
            <Avatar
              src={data}
              size="lg"
              radius="xl"
              style={{ marginRight: 20 }}
            />
            <Flex direction="column">
              <Text size="md" weight={500}>
                Wallet
              </Text>
              <Text size="sm" color="dimmed">
                {address}
              </Text>
            </Flex>
          </Group>
        </Flex>

        {/* Grand Total */}
        <Flex justify="center" mb={20}>
          <Group position="center">
            <Flex direction="column" align="center">
              <Text
                variant="gradient"
                gradient={{ from: "#f9d80d", to: "#fe7b17", deg: 45 }}
                sx={{ fontFamily: "Greycliff CF, sans-serif" }}
                ta="center"
                // fz="xl"
                fw={700}
                style={{ fontSize: 30 }}
              >
                Grand Total
              </Text>
              <Text size="xl" color="dimmed">
                {`$${balanceDetails

                  ?.reduce(
                    (acc, item) =>
                      acc + item?.balance * item?.tokenPrice?.usdPrice,
                    0
                  )
                  .toLocaleString()}`}
              </Text>
            </Flex>
          </Group>
        </Flex>

        <Table sx={{ minWidth: 400 }} verticalSpacing="xs" highlightOnHover>
          <thead>
            <tr>
              <th>Asset</th>
              <th>Asset Price</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Modal>
    </>
  );
};
